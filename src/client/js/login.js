const loginForm = document.getElementById("loginForm");
const idForm = loginForm.querySelector("#id");
const pwForm = loginForm.querySelector("#pw");
const loginBtn = document.querySelector(".loginBtn");

const centerMsg = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
  });

  Toast.fire({ title: msg, icon: "error" });
}

const loginFetch = async () => {
  if(!idForm.value) return centerMsg("아이디를 입력해주세요.")
  else if(!pwForm.value) return centerMsg("비밀번호를 입력해주세요.")

  const data = await (await fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ 
      id : idForm.value,
      pw : pwForm.value,
    }),
  })).json();
  console.log(data)
  if(data.code === "OK") location.href = "/"
  else centerMsg(data.message);
}

loginBtn.addEventListener('click', loginFetch)