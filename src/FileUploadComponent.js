import "./style.css";

//Привет, тут все просто, я все расскажу

class FileUploadComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.bindEvents();
    this.isUploading = false;
  }

  //Все в Shadow DOM, ну если изолирую стили и разметку то полностью и именно этого компонента.

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          display: flex;
          flex-direction: column;
          align-items: end;
          text-align: center;
          width: 290px;
          overflow: hidden;
          background: linear-gradient(0deg, rgba(239,239,239,1) 0%, rgba(84,79,233,1) 100%);
          height: 470px;
          border-radius: 25px;
        }
        
        .close-btn{
          position: absolute;
          width: 32px;
          height: 32px;
          margin: 15px 15px 0 0;
          background: rgba(218, 218, 218, 0.3);
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
        }

        #formBlock{
          height: 100%;
          width: 92%;
          padding: 4%;
          display: flex;
          height: 470px;
          flex-direction: column;
          justify-content: space-between;
        }

        #formBlock h2{
          font-size: 20px;
          font-weight: 500;
          margin: 0;
          margin-top: 35px
        }

        #uploadForm{
          height: 390px;
          gap: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        #uploadForm p{
          margin: 0;
          font-size: 14px;
          font-weight: 200;
          margin-top: 10px;
        }

        #uploadForm #name{
          height: 32px;
          padding: 0 10px;
          border-radius: 12px;
          border: 1px solid #A5A5A5;
          font-size: 17.5px;
          color:rgb(111, 111, 111);
          outline: none;
          font-weight: 300;
        }

        #uploadForm #name:focus {
          outline: none;
        }

        #uploadForm #name::placeholder {
          font-weight: 100;
          color: #A5A5A5;
        }

        .uploadFileSection {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 250px;
          position: relative;
          background: white;
          background: rgb(255, 255, 255, .4);
          border-radius: 25px;
          border: 1px solid gray;
          color: #5F5CF0;
          transition: .3s ease;
          cursor: pointer
        }
        
        .uploadFileSection:hover{
          background: rgb(255, 255, 255, .8);
        }

        .uploadFileSection #file{
          position: absolute;
          background: white;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 25px;
          z-index: 1000;
          opacity: 0;
        }

        .progress-form{
          position: relative;
          width: 97%;
          border-radius: 10px;
          background:rgba(255, 255, 255, 0.45);
          border: 1px solid gray;
          display: flex;
          gap: 10px;
          padding: 3px;
          height: 35px;
          display: none;
        }

        .progress-container {
          margin-top: 25px;
          width: 75%;
          height: 6px;
          background-color: #fff;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
        }

        .rigth-block-idk{
          width: 39px;
          border-radius: 11px;
          heigth: 29px;
          background: #5F5CF0;
        }

        .progress-bar {
          background-color: #5F5CF0;
          width: 0%;
          height: 6px;
          transition: width 0.3s;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1000;
        }

        .progress-percentage {
          position: absolute;
          right: 8px;
          top: -5px;;
          font-size: 10px;
          color: #5F5CF0;
        }

        .file-name{
          color: #5F5CF0;
          position: absolute;
          top: -5px;
          left: 53px;
        }

        #uploadButton{
          height: 50px;
          border-radius: 50px;
          font-size: 20px;
          color: #fff;
          background: #5F5CF0;
          border: none;
          transition: .3s ease;
          cursor: pointer;
        }
        #uploadButton:hover{
          background:rgb(73, 72, 190);
        }

        #uploadButton:disabled{
          background: #BBB9D2;
        }

        #successBlock{
          width: 290px;
          height: 470px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        #successMessage{
          font-size: 20px;
          font-weight: 500;
          margin: 0;
        }

        #errorBlock{
          width: 290px;
          height: 470px;
          background: linear-gradient(0deg, rgba(239,239,239,0) 0%, rgba(233,79,79,1) 100%);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        #errorMessage{
          font-size: 20px;
          font-weight: 500;
          margin: 0;
        }


        #messageInfo{
          width: 200px;
          font-size: 14px;
          text-align: start;
        }

        .error { color: red; }
        .success { color: green; }
      </style>
      <div class="container">
        <button class="close-btn">
          <img src="/closeWhite.png" alt="closeBTN" />
        </button>
        <div id="formBlock">
          <h2>Загрузочное окно</h2>
          <form id="uploadForm">
            <p>Перед загрузкой дайте имя файлу</p>
            <input type="text" id="name" placeholder="Название файла" required />
            <div class="uploadFileSection">
              <input type="file" id="file" accept=".txt,.json,.csv" required />
              <img src="/docsPic.png" alt="closeBTN" />
              <p>Нажмите сюда <br /> и выберите файл!</p>
            </div>
            <div class="progress-form" id="progressForm">
              <div class='rigth-block-idk'></div>
              <p class="file-name" id="filename">{file name}</p>
              <p class="progress-percentage" id="progressPercentage">0%</p>
              <div class="progress-container">
                <div class="progress-bar" id="progressBar"></div>
              </div>
            </div>
            <button type="submit" id="uploadButton" disabled>Загрузить</button>
          </form>
        </div>
        <div id="successBlock" style="display: none;">
          <div id="successMessage"></div>
          <div id="messageInfo"></div>
        </div>
        <div id="errorBlock" style="display: none;">
          <h3 class="errorMessage">Ошибка в загрузке файла</h3>
          <div id="errMessageInfo"></div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const nameInput = this.shadowRoot.getElementById("name");
    const fileInput = this.shadowRoot.getElementById("file");
    const uploadButton = this.shadowRoot.getElementById("uploadButton");
    const progressBar = this.shadowRoot.getElementById("progressBar");
    const progressPercentage =
      this.shadowRoot.getElementById("progressPercentage");
    const progressForm = this.shadowRoot.getElementById("progressForm");
    const filenameDisplay = this.shadowRoot.getElementById("filename");

    nameInput.addEventListener("input", () => {
      this.toggleUploadButton();
    });

    /* Проверяю, форматы какие, если не то - вырубаю и кидаю ошибку */

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        const fileSizeInBytes = file.size;
        const fileName = file.name;

        if (!this.validateFile(fileName, fileSizeInBytes)) {
          fileInput.value = "";
          this.showErrorMessage(
            "Invalid file. Please select a .txt, .json, or .csv file up to 1024 bytes."
          );
          return;
        }

        this.hideAllBlocks();
        this.showBlock("formBlock");
        filenameDisplay.textContent = fileName;
        this.toggleUploadButton();
      }
    });

    /* Загрузка файла на сервер с последующими приколами */

    uploadButton.addEventListener("click", async (event) => {
      event.preventDefault();
      if (this.isUploading) return;
      this.isUploading = true;

      nameInput.style.display = "none";
      progressForm.style.display = "block";
      const formData = new FormData();
      formData.append("name", nameInput.value);
      formData.append("file", fileInput.files[0]);

      /* 
        Непосредственно кидаем на сервер, поскольку никаких требований как это сделать не было,
        а запрос идет на https, я проксировал это в vite.config.js он в корне :3
      */

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/v1/upload", true);

        // Расширение ui блока который показывает процент загрузки
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.min(
              (event.loaded / event.total) * 100,
              66
            );
            progressBar.style.width = `${percentComplete}%`;
            progressPercentage.textContent = `${Math.round(percentComplete)}%`;
          }
        };

        /* 
          Смотрим - что да как, если успешно то-то,
          Если не успешно - то это,
          В целом на загрузку поставил задержку в 1400 мс,
          Не знаю зачем, мне так проще воспринимать, да и так бар загрузочка
          внизу доходит до 100%
        */
       
        xhr.onload = () => {
          this.isUploading = false;
          this.completeProgress(progressBar, progressPercentage);
          if (xhr.status === 200) {
            setTimeout(() => {
              const result = JSON.parse(xhr.responseText);
              this.showSuccessMessage(`Файл успешно загружен`);
              const messageInfo = this.shadowRoot.getElementById("messageInfo");
              messageInfo.innerHTML = `
                name: ${result.nameField || "Безымяный"}<br>
                filename: ${result.filename}<br>
                timestamp: ${result.timestamp}<br>
                message: ${result.message || "Файл успешно загружен"}
              `;
            }, 1400);
          } else {
            const errorResult = JSON.parse(xhr.responseText);
            this.showErrorMessage(
              errorResult.error || "Upload failed. Please try again."
            );
          }
        };

        xhr.onerror = () => {
          this.isUploading = false;
          this.showErrorMessage("Upload failed. Please try again.");
        };

        xhr.send(formData);
      } catch (error) {
        this.isUploading = false;
        this.showErrorMessage("Upload failed. Please try again.");
      }
    });
  }

  //Вот и сама загрузочка до 100%

  completeProgress(progressBar, progressPercentage) {
    let currentWidth = parseFloat(progressBar.style.width || "0");
    const interval = setInterval(() => {
      if (currentWidth >= 100) {
        clearInterval(interval);
        return;
      }
      currentWidth += 2;
      progressBar.style.width = `${currentWidth}%`;
      progressPercentage.textContent = `${Math.round(currentWidth)}%`;
    }, 50);
  }

  toggleUploadButton() {
    const nameInput = this.shadowRoot.getElementById("name");
    const fileInput = this.shadowRoot.getElementById("file");
    const uploadButton = this.shadowRoot.getElementById("uploadButton");
    uploadButton.disabled = !(nameInput.value && fileInput.files.length > 0);
  }

  /* 
    Тут всякие маленькие функции которые вызываются, по названиям понятно.
    Можно было-бы вынести в отдельный файл, но мне дорого мое време
  */

  validateFile(fileName, fileSize) {
    const validExtensions = [".txt", ".json", ".csv"];
    const fileExtension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );
    return validExtensions.includes("." + fileExtension) && fileSize <= 1024;
  }

  showBlock(blockId) {
    const blocks = this.shadowRoot.querySelectorAll(".container > div");
    blocks.forEach((block) => {
      block.style.display = block.id === blockId ? "block" : "none";
    });
  }

  hideAllBlocks() {
    const blocks = this.shadowRoot.querySelectorAll(".container > div");
    blocks.forEach((block) => {
      block.style.display = "none";
    });
  }

  showSuccessMessage(message) {
    this.hideAllBlocks();
    const successBlock = this.shadowRoot.getElementById("successBlock");
    const successMessage = this.shadowRoot.getElementById("successMessage");
    successBlock.style.display = "flex";
    successMessage.textContent = message;
  }

  showErrorMessage(message) {
    this.hideAllBlocks();
    const errorBlock = this.shadowRoot.getElementById("errorBlock");
    const errorMessage = this.shadowRoot.getElementById("errMessageInfo");
    errorBlock.style.display = "flex";
    errorMessage.textContent = message;
  }
  e;
}

customElements.define("file-upload-component", FileUploadComponent);