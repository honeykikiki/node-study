console.log(this); //globalx

let a = () => {
  return console.log(this);
};
a();
