import React from "react";
import {Component} from "react";
import Translate from "react-translate-component";
import ProposedOperation, {
    TransactionIDAndExpiry
} from "components/Blockchain/ProposedOperation";
import BindToChainState from "components/Utility/BindToChainState";
import ChainTypes from "components/Utility/ChainTypes";
import utils from "common/utils";
import ProposalModal, {finalRequiredPerms} from "../Modal/ProposalModal";
import NestedApprovalState from "../Account/NestedApprovalState";
import {ChainStore, FetchChainObjects} from "bitsharesjs";
import counterpart from "counterpart";
import pu from "common/permission_utils";
import LinkToAccountById from "../Utility/LinkToAccountById";
import AccountStore from "stores/AccountStore";
import accountUtils from "common/account_utils";

class Proposals extends Component {
    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired
    };

    constructor() {
        super();

        this.state = {
            isModalVisible: false,
            modal: {
                action: null,
                proposalId: null,
                accountId: null
            }
        };

        this.forceUpdate = this.forceUpdate.bind(this);
        this._isSucpicious = this._isSucpicious.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        /*
        * Account objects don't get updated by underlying proposal changes, but
        * the ChainStore does, so in order to update this component when a proposal
        * changes, we need to update it whenever the ChainStore itself updates
        */
        ChainStore.subscribe(this.forceUpdate);
    }

    componentWillUnmount() {
        ChainStore.unsubscribe(this.forceUpdate);
    }

    showModal({action, proposalId, accountId}) {
        this.setState({
            isModalVisible: true,
            modal: {
                action,
                proposalId,
                accountId
            }
        });
    }

    hideModal() {
        this.setState({
            isModalVisible: false,
            modal: {
                action: null,
                proposalId: null,
                accountId: null
            }
        });
    }

    _onApproveModal(proposalId, accountId, action) {
        this.showModal({action, proposalId, accountId});
    }

    _canReject(proposal) {
        return (
            proposal.available_active_approvals.length ||
            proposal.available_owner_approvals.length ||
            proposal.available_key_approvals.length
        );
    }

    _isSucpicious(proposal) {
        let isSuspicious = false;

        let touchedAccounts = [];
        proposal.operations.forEach(o => {
            touchedAccounts.push(o.getIn([1, "to"]));
        });

        let proposer = proposal.proposal.get("proposer");

        touchedAccounts.push(proposer);

        console.log(touchedAccounts);

        touchedAccounts.forEach(_account => {
            if (accountUtils.isKnownScammer(_account)) {
                isSuspicious = true;
            }
            if (
                this.props.account.get("blacklisted_accounts").some(item => {
                    return item === _account;
                })
            ) {
                isSuspicious = true;
            }
        });
        return isSuspicious;
    }

    render() {
        let {account} = this.props;
        if (!account) return null;

        let proposals = [];

        if (account.get("proposals").size) {
            account.get("proposals").forEach(proposal_id => {
                var proposal = ChainStore.getObject(proposal_id);
                if (proposal) {
                    var proposed_transaction = proposal.get(
                        "proposed_transaction"
                    );
                    var operations = proposed_transaction.get("operations");
                    proposals.push({operations, account, proposal});
                }
            });
        }

        let proposalRows = proposals
            .sort((a, b) => {
                return utils.sortID(
                    a.proposal.get("id"),
                    b.proposal.get("id"),
                    true
                );
            })
            .reduce((result, proposal, index) => {
                const id = proposal.proposal.get("id");
                const proposer = proposal.proposal.get("proposer");
                const expiration = proposal.proposal.get("expiration_time");
                let text = proposal.operations
                    .map((o, index) => {
                        return (
                            <ProposedOperation
                                key={
                                    proposal.proposal.get("id") +
                                    "_operation_" +
                                    index
                                }
                                expiration={expiration}
                                index={index}
                                op={o.toJS()}
                                inverted={false}
                                hideFee={true}
                                hideOpLabel={true}
                                hideExpiration
                                hideDate={true}
                                proposal={true}
                                id={id}
                                proposer={proposer}
                            />
                        );
                    })
                    .toArray();

                let canReject = this._canReject(proposal.proposal.toJS());
                let proposalId = proposal.proposal.get("id");

                let type = proposal.proposal.get("required_active_approvals")
                    .size
                    ? "active"
                    : "owner";
                result.push(
                    <tr key={`${proposalId}_id`}>
                        <td
                            colSpan="4"
                            className={
                                "proposal" + (index === 0 ? " first" : "")
                            }
                        >
                            <TransactionIDAndExpiry
                                id={id}
                                expiration={expiration}
                            />
                        </td>
                    </tr>
                );

                const available = pu.listToIDs(
                    proposal.proposal.get(`available_${type}_approvals`)
                );
                const availableKeys = pu.listToIDs(
                    proposal.proposal.get("available_key_approvals")
                );

                const required = pu.listToIDs(
                    proposal.proposal.get(`required_${type}_approvals`)
                );
                const requiredPermissions = pu.unnest(required, type);

                const [accounts, keys] = finalRequiredPerms(
                    requiredPermissions,
                    available,
                    availableKeys
                );

                const accountNames = [];

                if (accounts.length) {
                    accounts.forEach(account => {
                        if (
                            account &&
                            !proposal.proposal
                                .get(`available_${type}_approvals`)
                                .includes(account)
                        ) {
                            accountNames.push(account);
                        }
                    });
                }

                const keyNames = [];
                if (keys.length) {
                    keys.forEach(key => {
                        let isMine = AccountStore.isMyKey(key);
                        if (
                            isMine &&
                            !proposal.proposal
                                .get("available_key_approvals")
                                .includes(key)
                        ) {
                            keyNames.push(key);
                        }
                    });
                }

                const canApprove = accountNames.length + keyNames.length > 0;

                result.push(
                    <tr
                        className="top-left-align"
                        key={`${proposalId}_content`}
                    >
                        <td>{text}</td>
                        <td>
                            {requiredPermissions.map((account, index) => (
                                <div
                                    className="list-item"
                                    key={`${proposalId}_approver_${index}`}
                                >
                                    <LinkToAccountById
                                        subpage="permissions"
                                        account={account.id}
                                    />
                                </div>
                            ))}
                        </td>
                        <td>
                            <NestedApprovalState
                                proposal={proposal.proposal.get("id")}
                                type={type}
                            />
                        </td>
                        <td className="approval-buttons">
                            {this.props.hideFishingProposals &&
                            this._isSucpicious(proposal) ? (
                                <div
                                    data-tip={counterpart.translate(
                                        "tooltip.propose_scam"
                                    )}
                                    className="tooltip has-error scam-error"
                                >
                                    POSSIBLE SCAM
                                </div>
                            ) : (
                                <button
                                    onClick={
                                        canApprove
                                            ? this._onApproveModal.bind(
                                                  this,
                                                  proposalId,
                                                  proposal.account.get("id"),
                                                  "approve"
                                              )
                                            : () => {}
                                    }
                                    className={
                                        "button primary hollow" +
                                        (canApprove ? "" : " hidden")
                                    }
                                >
                                    <span>
                                        <Translate content="proposal.approve" />
                                    </span>
                                </button>
                            )}
                            {canReject ? (
                                <button
                                    onClick={this._onApproveModal.bind(
                                        this,
                                        proposalId,
                                        proposal.account.get("id"),
                                        "reject"
                                    )}
                                    className="button primary hollow"
                                >
                                    <Translate content="proposal.reject" />
                                </button>
                            ) : null}
                            <button
                                onClick={this._onApproveModal.bind(
                                    this,
                                    proposalId,
                                    proposal.account.get("id"),
                                    "delete"
                                )}
                                className="button primary hollow"
                            >
                                <Translate content="proposal.delete" />
                            </button>
                        </td>
                    </tr>
                );
                result.push(
                    <tr key={`${proposalId}_separator`}>
                        <td colSpan="4">
                            <hr />
                        </td>
                    </tr>
                );
                return result;
            }, []);

        return (
            <div>
                <table
                    className={
                        "table proposals compact " + this.props.className
                    }
                >
                    <thead>
                        <tr>
                            <th>
                                <Translate content="proposal.proposals" />
                            </th>
                            <th>
                                <Translate content="proposal.approvers" />
                            </th>
                            <th>
                                <Translate content="proposal.status" />
                            </th>
                            <th>
                                <Translate content="proposal.action" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>{proposalRows}</tbody>
                </table>
                <ProposalModal
                    ref={"modal"}
                    visible={this.state.isModalVisible}
                    hideModal={this.hideModal}
                    showModal={this.showModal}
                    account={this.state && this.state.modal.accountId}
                    proposal={this.state && this.state.modal.proposalId}
                    action={this.state && this.state.modal.action}
                />
            </div>
        );
    }
}

export default BindToChainState(Proposals);
