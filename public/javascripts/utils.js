export const HandleFirstSpinner = (() => {
    const spinner = document.querySelector(".spinner-border");
  
    const showSpinner = () => spinner.classList.remove("invisible");
    const hideSpinner = () => spinner.classList.add("invisible");
  
    return { showSpinner, hideSpinner };
  })();