import "@uppy/core/dist/style.css";
import "@uppy/file-input/dist/style.css";

import "es6-promise/auto";
import "whatwg-fetch";
import Uppy from "@uppy/core";
import FileInput from "@uppy/file-input";
import XHRUpload from "@uppy/xhr-upload";
import ProgressBar from "@uppy/progress-bar";
import Form from "@uppy/form";

const uppy = new Uppy({ debug: true, autoProceed: false });
uppy.use(Form, {
  target: "form",
  resultName: "uppyResult",
  getMetaFromForm: true,
  addResultToForm: true,
  multipleResults: false,
  submitOnSuccess: false,
  triggerUploadOnSubmit: false
});

uppy.use(FileInput, {
  target: ".UppyForm",
  pretty: true,
  replaceTargetContent: true
});
uppy.use(ProgressBar, {
  target: ".UppyProgressBar",
  hideAfterFinish: false
});
uppy.use(XHRUpload, {
  endpoint: "https://hook.us1.make.com/u86xn8shxxnyc2khlghth7ck9dctzb7m",
  formData: true,
  fieldName: "files[]"
});

// And display uploaded files
uppy.on("upload-success", (file, response) => {
  const url = response.uploadURL;
  const fileName = file.name;
  alert(url);
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.appendChild(document.createTextNode(fileName));
  li.appendChild(a);

  document.querySelector(".uploaded-files ol").appendChild(li);
});

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  uppy.upload();
  alert("upload");
});

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;