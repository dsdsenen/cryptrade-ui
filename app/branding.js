/** This file centralized customization and branding efforts throughout the whole wallet and is meant to facilitate
 *  the process.
 *
 *  @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

/**
 * Wallet name that is used throughout the UI and also in translations
 * @returns {string}
 */
export function getWalletName() {
    return "Cryptrade";
}

/**
 * URL of this wallet
 * @returns {string}
 */
export function getWalletURL() {
    return "https://wallet.cryptrade.io";
}

/**
 * Returns faucet information
 *
 * @returns {{url: string, show: boolean}}
 */
export function getFaucet() {
    return {
        url: "https://faucet.bitshares.eu/onboarding", // 2017-12-infrastructure worker proposal
        show: true,
        editable: false
    };
}

/**
 * Logo that is used throughout the UI
 * @returns {*}
 */
export function getLogo() {
    return require("assets/logo_cryptrade.png");
}

/**
 * Default set theme for the UI
 * @returns {string}
 */
export function getDefaultTheme() {
    // possible ["darkTheme", "lightTheme", "midnightTheme"]
    return "midnightTheme";
}

/**
 * Default login method. Either "password" (for cloud login mode) or "wallet" (for local wallet mode)
 * @returns {string}
 */
export function getDefaultLogin() {
    // possible: one of "password", "wallet"
    return "password";
}

/**
 * Default units used by the UI
 *
 * @returns {[string,string,string,string,string,string]}
 */
export function getUnits(chainId = "4018d784") {
    if (chainId === "4018d784")
        return [
            "BTS",
            "CRYPTRADE.BTC",
            "CRYPTRADE.CRCO",
            "USD",
            "CNY",
            "EUR",
            "GBP"
        ];
    else if (chainId === "39f5e2ed") return ["TEST"];
    // unknown chain id: (need to return at least one unit)
    else return ["BTS"];
}

/**
 * These are the highlighted bases in "My Markets" of the exchange
 *
 * @returns {[string]}
 */

export function getMyMarketsBases() {
    return ["BTC", "BTS", "CRCO"];
}

/**
 * These are the default quotes that are shown after selecting a base
 *
 * @returns {[string]}
 */
export function getMyMarketsQuotes() {
    let tokens = {
        nativeTokens: [
            "BTC",
            "BTS",
            "CNY",
            "EUR",
            "GOLD",
            "KRW",
            "RUBLE",
            "SILVER",
            "USD"
        ],
        bridgeTokens: ["BRIDGE.BCO", "BRIDGE.BTC", "BRIDGE.MONA", "BRIDGE.ZNY"],
        gdexTokens: ["GDEX.BTC", "GDEX.BTO", "GDEX.EOS", "GDEX.ETH"],
        openledgerTokens: [
            "OBITS",
            "OPEN.BTC",
            "OPEN.DASH",
            "OPEN.DGD",
            "OPEN.DOGE",
            "OPEN.EOS",
            "OPEN.EOSDAC",
            "OPEN.ETH",
            "OPEN.EURT",
            "OPEN.GAME",
            "OPEN.GRC",
            "OPEN.INCNT",
            "OPEN.KRM",
            "OPEN.LISK",
            "OPEN.LTC",
            "OPEN.MAID",
            "OPEN.MKR",
            "OPEN.NEO",
            "OPEN.OMG",
            "OPEN.SBD",
            "OPEN.STEEM",
            "OPEN.TUSD",
            "OPEN.USDT",
            "OPEN.WAVES",
            "OPEN.XMR",
            "OPEN.ZEC",
            "OPEN.ZRX"
        ],
        rudexTokens: [
            "PPY",
            "RUDEX.DCT",
            "RUDEX.DGB",
            "RUDEX.GBG",
            "RUDEX.GOLOS",
            "RUDEX.KRM",
            "RUDEX.MUSE",
            "RUDEX.SBD",
            "RUDEX.STEEM",
            "RUDEX.TT"
        ],
        sparkTokens: ["ZEPH", "SPARKDEX.ETH", "SPARKDEX.BTC"],
        winTokens: ["WIN.ETC", "WIN.ETH", "WIN.HSR"],
        xbtsxTokens: [
            "XBTSX.STH",
            "XBTSX.POST",
            "XBTSX.DOGE",
            "XBTSX.BTC",
            "XBTSX.LTC",
            "XBTSX.DASH",
            "XBTSX.KEC",
            "XBTSX.BTG",
            "XBTSX.XSPEC",
            "XBTSX.NVC",
            "XBTSX.42",
            "XBTSX.UNI",
            "XBTSX.NMC",
            "XBTSX.WAVES",
            "XBTSX.COF",
            "XBTSX.XRUP",
            "XBTSX.P2P",
            "XBTSX.STEEP"
        ],
        otherTokens: [
            "BKT",
            "BLOCKPAY",
            "BTWTY",
            "TWENTIX",
            "BTSR",
            "CADASTRAL",
            "CVCOIN",
            "HEMPSWEET",
            "HERO",
            "HERTZ",
            "ICOO",
            "IOU.CNY",
            "KAPITAL",
            "KEXCOIN",
            "OCT",
            "SMOKE",
            "STEALTH",
            "YOYOW"
        ]
    };

    let allTokens = [];
    for (let type in tokens) {
        allTokens = allTokens.concat(tokens[type]);
    }
    return allTokens;
}

/**
 * The featured markets displayed on the landing page of the UI
 *
 * @returns {list of string tuples}
 */
export function getFeaturedMarkets(quotes = []) {
    return [
        ["USD", "BTS"],
        ["USD", "OPEN.BTC"],
        ["USD", "OPEN.USDT"],
        ["USD", "OPEN.ETH"],
        ["USD", "OPEN.DASH"],
        ["USD", "GOLD"],
        ["USD", "HERO"],
        ["USD", "GDEX.BTC"],
        ["USD", "GDEX.ETH"],
        ["USD", "GDEX.EOS"],
        ["USD", "GDEX.BTO"],
        ["USD", "OPEN.EOSDAC"],
        ["CNY", "BTS"],
        ["CNY", "OPEN.BTC"],
        ["CNY", "USD"],
        ["CNY", "OPEN.ETH"],
        ["CNY", "YOYOW"],
        ["CNY", "OCT"],
        ["CNY", "GDEX.BTC"],
        ["CNY", "GDEX.ETH"],
        ["CNY", "GDEX.EOS"],
        ["CNY", "GDEX.BTO"],
        ["CNY", "GDEX.BTM"],
        ["OPEN.BTC", "BTS"],
        ["OPEN.BTC", "OPEN.ETH"],
        ["OPEN.BTC", "OPEN.DASH"],
        ["OPEN.BTC", "BLOCKPAY"],
        ["OPEN.BTC", "OPEN.DGD"],
        ["OPEN.BTC", "OPEN.STEEM"],
        ["BTS", "OPEN.ETH"],
        ["BTS", "OPEN.EOS"],
        ["BTS", "PPY"],
        ["BTS", "OPEN.STEEM"],
        ["BTS", "OBITS"],
        ["BTS", "RUBLE"],
        ["BTS", "HERO"],
        ["BTS", "OCT"],
        ["BTS", "SILVER"],
        ["BTS", "GOLD"],
        ["BTS", "BLOCKPAY"],
        ["BTS", "BTWTY"],
        ["BTS", "SMOKE"],
        ["BTS", "GDEX.BTC"],
        ["BTS", "GDEX.ETH"],
        ["BTS", "GDEX.EOS"],
        ["BTS", "GDEX.BTO"],
        ["BTS", "OPEN.EOSDAC"],
        ["KAPITAL", "OPEN.BTC"],
        ["USD", "OPEN.STEEM"],
        ["USD", "OPEN.MAID"],
        ["OPEN.USDT", "OPEN.BTC"],
        ["OPEN.BTC", "OPEN.MAID"],
        ["BTS", "OPEN.MAID"],
        ["BTS", "OPEN.HEAT"],
        ["BTS", "OPEN.INCENT"],
        ["HEMPSWEET", "OPEN.BTC"],
        ["KAPITAL", "BTS"],
        ["BTS", "RUDEX.STEEM"],
        ["USD", "RUDEX.STEEM"],
        ["BTS", "RUDEX.SBD"],
        ["BTS", "RUDEX.KRM"],
        ["USD", "RUDEX.KRM"],
        ["RUBLE", "RUDEX.GOLOS"],
        ["CNY", "RUDEX.GOLOS"],
        ["RUBLE", "RUDEX.GBG"],
        ["CNY", "RUDEX.GBG"],
        ["BTS", "RUDEX.MUSE"],
        ["BTS", "RUDEX.TT"],
        ["BTS", "RUDEX.SCR"],
        ["BTS", "RUDEX.ETH"],
        ["BTS", "RUDEX.DGB"],
        ["BTS", "XBTSX.STH"],
        ["BTS", "XBTSX.WAVES"],
        ["BTS", "ZEPH"],
        ["BTS", "HERTZ"],
        ["BTS", "SPARKDEX.BTC"],
        ["BTS", "SPARKDEX.ETH"]
    ].filter(a => {
        if (!quotes.length) return true;
        return quotes.indexOf(a[0]) !== -1;
    });
}

/**
 * Recognized namespaces of assets
 *
 * @returns {[string,string,string,string,string,string,string]}
 */
export function getAssetNamespaces() {
    return [
        "OPEN.",
        "RUDEX.",
        "WIN.",
        "BRIDGE.",
        "GDEX.",
        "XBTSX.",
        "SPARKDEX.",
        "CITADEL.",
        "CRYPTRADE."
    ];
}

/**
 * These namespaces will be hidden to the user, this may include "bit" for BitAssets
 * @returns {[string,string]}
 */
export function getAssetHideNamespaces() {
    // e..g "OPEN.", "bit"
    return ["CRYPTRADE."];
}

/**
 * Allowed gateways that the user will be able to choose from in Deposit Withdraw modal
 * @param gateway
 * @returns {boolean}
 */
export function allowedGateway(gateway) {
    return ["CRYPTRADE"].indexOf(gateway) >= 0;
}

export function getSupportedLanguages() {
    // not yet supported
}

export function getAllowedLogins() {
    // possible: list containing any combination of ["password", "wallet"]
    return ["password", "wallet"];
}

/**
 * Namespace of Cryptrade Issued Assets
 * @returns {string}
 */
export function getCryptradeAssetNamespace() {
    return "CRYPTRADE.";
}

/**
 * Issuer Account of Cryptrade
 * @returns {{name: string, id: string}}
 */
export function getCryptradeIssuerAccount() {
    return {
        id: "1.2.1150161",
        name: "cryptrade"
    };
}

/**
 * Support Email of Cryptrade
 * @returns {string}
 */
export function getCryptradeSupportEmail() {
    return "support@cryptrade.io";
}

/**
 * Map issued asset name to real asset name, in case the asset name include numbers
 * @returns {{}}
 */
export function getCryptradeRealAssetNames() {
    // e..g BRIM: "BR1M"
    // issued asset name : "real asset name"
    return {};
}

/**
 * Get default market of Cryptrade
 * @returns {{quote: string, id: string, base: string}}
 */
export function getCryptradeDefaultMarket() {
    return {
        id: "CRYPTRADE.CRCO_CRYPTRADE.BTC",
        quote: "CRYPTRADE.CRCO",
        base: "CRYPTRADE.BTC"
    };
}

/**
 * Get Static URL
 * @returns {string}
 */
export function getCryptradeStaticURL() {
    return "https://static.cryptrade.io";
}
