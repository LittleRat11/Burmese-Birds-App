// *scroll bar section start
const bgImg = document.querySelector("#backgroundImg");
let homeContainer = document.querySelector(".home-container");
window.addEventListener("scroll", () => {
    updateImg()
});

function updateImg() {
    bgImg.style.opacity = 1 - window.pageYOffset / 800;
    bgImg.style.backgroundSize = 120 - window.pageYOffset / 12 + "%";
}
// *scroll bar section end
// *fetch data
let birdsList = "";
const cardLists = document.querySelector(".cards-list");

function fetchData() {
    fetch("Birds.json").then(res => res.json())
        .then(data => {
            console.log(data.Tbl_Bird[0].Id);
            for (let i = 0; i < data.Tbl_Bird.length; i++) {
                birdsList += `
                <div class="card">
                <div class="imgContainer">
                    <img src="${data.Tbl_Bird[i].ImagePath}" alt="" class="card-img">
                </div>
                <div class="card-body">
                    <h2>${data.Tbl_Bird[i].BirdMyanmarName}</h2>
                    <p>${data.Tbl_Bird[i].BirdEnglishName}</p>
                </div>
                <button id="view-btn" onclick="birdDetail(${data.Tbl_Bird[i].Id})">View</button>
            </div>
                `
            }
            cardLists.innerHTML = birdsList;
        })
}

fetchData();

// *Bird Detail
function birdDetail(id) {
    fetch("Birds.json")
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.Tbl_Bird.length; i++) {
                if (id === data.Tbl_Bird[i].Id) {
                    document.body.innerHTML = `
                    <div class="wrapper">
                    <div id="container">
                        <h1>${data.Tbl_Bird[i].BirdMyanmarName} (${data.Tbl_Bird[i].BirdEnglishName})</h1>
                        <p>
                            ${data.Tbl_Bird[i].Description}
                        </p>
                        <img src="${data.Tbl_Bird[i].ImagePath}" alt="">
                    </div>
                    <div id="preview-container"></div>
                </div>
                <div class="buttons">
                <a href="index.html"><button class="back-btn">Back</button></a>
                    <button id="capture-btn">Capture Screenshot</button>
                    <a id="download-btn" class="hide">Download ScreenShot</a>
                </div>
             `
                }
            }
            // *capture screenshot
            const container = document.querySelector("#container");
            const captureBtn = document.querySelector("#capture-btn");
            const downloadBtn = document.querySelector("#download-btn");
            const previewContainer = document.querySelector("#preview-container");

            captureBtn.addEventListener("click", async() => {
                downloadBtn.classList.remove("hide");

                const canvas = await html2canvas(container);
                const img = canvas.toDataURL();
                previewContainer.innerHTML = `<img src="${img}" id="image">`;
                downloadBtn.href = img;
                downloadBtn.download = `bird_detail.jpeg`;
            })


        })
}