// Thêm sự kiện khi trang web load xong
document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
});

// Hàm tải danh sách sinh viên
async function loadStudents() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby5mgcTppXUNVgTR2fL67iLv-yPJZMahPz11WBruUC17EcP0yqkBjf6KmgjAiSK8Sn5/exec"
    );
    const data = await response.json();
    displayStudents(data);
  } catch (error) {
    console.error("Error loading students:", error);
    document.getElementById("student-list").innerHTML =
      "Không thể tải dữ liệu sinh viên";
  }
}

// Hiển thị danh sách sinh viên
function displayStudents(students) {
  const studentList = document.getElementById("student-list");
  const html = students
    .map(
      (sv) => `
      <div class="card">
        <img src="Image/${sv.image}" alt="${sv.name}" onerror="this.src='https://via.placeholder.com/200'">
        <div class="card-content">
          <h3>${sv.name}</h3>
          <p>Lớp: ${sv.class}</p>
          <a href="detail.html?id=${sv.id}">Xem chi tiết</a>
        </div>
      </div>
    `
    )
    .join("");

  studentList.innerHTML = html;
}

// Load student detail
async function loadStudentDetail() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const response = await fetch(
      `https://script.google.com/macros/s/AKfycby5mgcTppXUNVgTR2fL67iLv-yPJZMahPz11WBruUC17EcP0yqkBjf6KmgjAiSK8Sn5/exec`
    );
    const data = await response.json();
    const sv = data.find((student) => student.id === id);
    if (!sv) {
      document.getElementById(
        "detail"
      ).innerHTML = `<p>Không tìm thấy sinh viên</p>`;
      return;
    }
    document.title = sv.name;
    document.getElementById("detail").innerHTML = `
        <div class="top-container">
            <span class="pin-icon">📌</span>
        </div>
          <div class="detail-card">
            <div class="image-wrapper">
                <img src="Image/${sv.image}" alt="${
      sv.name
    }" onerror="this.src='https://via.placeholder.com/400'">
                <img src="Image/crown.png" alt="Crown" class="crown-icon">
            </div>
            <div class="detail-content">
              <h1>${sv.name}</h1>
              <p class="detail-class"><span>Lớp: ${sv.class}</span></p>
              <p class="detail-major"><span>Ngành: ${sv.major}</span></p>
              <p class="detail-faculty"><span>Khoa: ${sv.faculty}</span></p>
              <p class="detail-score"><span>Điểm trung bình học kỳ: ${
                sv.score
              }</span></p>
              <p class="detail-practice"><span>Điểm rèn luyện học kỳ: ${
                sv.practice
              }</span></p>
            </div>
          </div>
      
          <div class="detail-text">${sv.message || "Chưa có thông điệp"}</div>
        `;
  } catch (error) {
    console.error("Error loading student detail:", error);
    document.getElementById("detail").innerHTML =
      "Không thể tải thông tin sinh viên";
  }
}

function launchConfetti() {
  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);

    const size = Math.random() * 8 + 4; // Kích thước ngẫu nhiên
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.left = `${Math.random() * 100}%`;

    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;

    // Animation ngẫu nhiên
    confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
    confetti.style.animationDelay = `0s`;

    // Loại bỏ sau khi kết thúc
    setTimeout(() => confetti.remove(), 6000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setInterval(launchConfetti, 500);
});
