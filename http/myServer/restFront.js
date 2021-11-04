async function getUser() {
  try {
    const res = await axios.get("/lists");
    const lists = res.data;
    const $list = document.querySelector("#list");
    $list.innerHTML = "";
    console.log(res, "res");
    Object.keys(lists).map((key) => {
      const listDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = lists[key];

      const edit = document.createElement("button");
      edit.innerHTML = "t수정";
      edit.addEventListener("click", async () => {
        const name = prompt("이름을 입력해주세여");
        if (!name) {
          return alert("이름을 입력해주세요!");
        }
        try {
          await axios.put("/list/" + key, { name });
          getUser();
        } catch (error) {
          console.error(error);
        }
      });

      const remove = document.createElement("button");
      remove.innerHTML = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete("/list/" + key);
          getUser();
        } catch (error) {
          console.error(error);
        }
      });
      listDiv.append(span);
      listDiv.append(edit);
      listDiv.append(remove);
      $list.append(listDiv);
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.input.value;
  if (!name) {
    return alert("이름을 입력하세요");
  }
  try {
    await axios.post("/user", { name });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = "";
});
