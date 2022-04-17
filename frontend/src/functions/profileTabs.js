export function infoTab() {
    document.getElementById("infoTab").classList = ["nav-link active"]
    document.getElementById("settings").classList = ["tab-pane active"]
    document.getElementById("passwordTab").classList = ["nav-link"]
    document.getElementById("password").classList = ["tab-pane"]
    document.getElementById("walletTab").classList = ["nav-link"]
    document.getElementById("wallet").classList = ["tab-pane"]
}
export function passwordTab(){
    document.getElementById("infoTab").classList = ["nav-link"]
    document.getElementById("settings").classList = ["tab-pane"]
    document.getElementById("passwordTab").classList = ["nav-link active"]
    document.getElementById("password").classList = ["tab-pane active"]
    document.getElementById("walletTab").classList = ["nav-link"]
    document.getElementById("wallet").classList = ["tab-pane"]
}

export function walletTab(){
    document.getElementById("infoTab").classList = ["nav-link"]
    document.getElementById("settings").classList = ["tab-pane"]
    document.getElementById("passwordTab").classList = ["nav-link"]
    document.getElementById("password").classList = ["tab-pane"]
    document.getElementById("walletTab").classList = ["nav-link active"]
    document.getElementById("wallet").classList = ["tab-pane active"]
}