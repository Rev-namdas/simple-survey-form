const {
    checkIfTopicExists,
    setCreateNewForm,
    updateCreatedForm,
    getFormByUrl,
    getTopicList,
	getQuestionsById,
} = require("./forms.controllers");

const router = require("express").Router();

module.exports = (app) => {
    router.post("/check-topic-exists", checkIfTopicExists);
    router.post("/create", setCreateNewForm);
    router.patch("/update", updateCreatedForm);
    router.get("/fetch-by-url/:name", getFormByUrl);
    router.get("/topic/list", getTopicList);
    router.get("/fetch-question-by-id/:id", getQuestionsById);

    app.use("/api/form", router);
};
