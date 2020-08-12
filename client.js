const { axios } = require("./fakeBackend/mock");

const getFeedbackByProductViewData = async (product, actualize = false) => {
  console.log("Function start");

  const sortByDate = (arr) => {
    arr.sort((a, b) => (a.date > b.date ? 1 : -1));
  };

  return new Promise((resolve, reject) => {
    axios
      .get("/feedback", {
        params: {
          product,
        },
      })
      .catch(function (error) {
        resolve({ message: error.response.data.message });
      })

      .then(function (response) {
        if (response && response.status === 200) {
          const data = response.data;
          if (data) {
            if (data.feedback.length === 0) {
              resolve({ message: "Отзывов пока нет" });
            }

            if (product === "diadoc" || product === "zakupki") {
              sortByDate(data.feedback);
            }

            data.feedback.map((f) => {
              f.name = "name here";
              let date = new Date(f.date);
              f.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            });
            resolve(data);
          }
        }
      });
  });
};

module.exports = { getFeedbackByProductViewData };
