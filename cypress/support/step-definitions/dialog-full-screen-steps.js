import {
  dialogFullScreenChildren,
  dialogFullScreenPreview,
  dialogFullScreenPreviewClosedState,
} from "../../locators/dialog-full-screen";

Then("Dialog Full Screen children on preview is {word}", (children) => {
  dialogFullScreenChildren().should("contain.text", children);
});

Then("Dialog Full Screen is visible", () => {
  dialogFullScreenPreview().should("be.visible");
});

Then("Dialog Full Screen is not visible", () => {
  dialogFullScreenPreviewClosedState().should("exist");
});
