
const getSearchPage = (req, res) => {
    res.render("search", { title: "Search", clientCode: "searchFunction.js"});
}

//const postSearchPage = (req, res) => {}

module.exports = {
    getSearchPage,
    //postSearchPage
};