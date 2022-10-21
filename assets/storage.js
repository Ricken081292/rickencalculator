export default class {
  static #CACHE_KEY = "calculation_history";
  static #checkForStorage = typeof Storage !== undefined;
  static pushHistory(data) {
    let historyData = null;
    if (this.#checkForStorage) {
      if (localStorage.getItem(this.#CACHE_KEY) === null) {
        historyData = [];
      } else {
        historyData = JSON.parse(localStorage.getItem(this.#CACHE_KEY));
      }
      historyData.unshift(data);
      if (historyData.length > 5) {
        historyData.pop();
      }
    }
    localStorage.setItem(this.#CACHE_KEY, JSON.stringify(historyData));
  }
  static getHistory() {
    if (this.#checkForStorage) {
      return JSON.parse(localStorage.getItem(this.#CACHE_KEY)) || [];
    } else {
      return [];
    }
  }

  static renderHistory() {
    const histories = this.getHistory();
    const historyList = document.querySelector("#historyList");
    let li = "";
    histories.map((history) => {
      li += `<tr>
        <td>${history.angkaPertama}</td>
        <td>${history.operator}</td>
        <td>${history.angkaKedua}</td>
        <td>${history.result}</td>
      </tr>`;
    });
    historyList.innerHTML = li;
  }
}
