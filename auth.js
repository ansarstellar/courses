export function auth(req, res, next) {
    console.log("Authenticating...");
    next();
}