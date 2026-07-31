(() => {
  const FORM_ID = "inquiry-form";
  const STATUS_ID = "inquiry-form-status";
  const SUPPORT_EMAIL = "fashion@bestintegrityglobal.com";

  function setStatus(status, message, state) {
    status.textContent = message;
    status.className = `form-submit-status ${state ? `is-${state}` : ""}`.trim();
  }

  function initialiseForm() {
    const form = document.getElementById(FORM_ID);

    if (!form || form.dataset.formHandlerReady === "true") {
      return;
    }

    form.dataset.formHandlerReady = "true";

    const button = form.querySelector('button[type="submit"]');
    if (!button) {
      return;
    }

    const originalButtonContent = button.innerHTML;
    let status = document.getElementById(STATUS_ID);

    if (!status) {
      status = document.createElement("p");
      status.id = STATUS_ID;
      status.className = "form-submit-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.setAttribute("tabindex", "-1");
      button.insertAdjacentElement("afterend", status);
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.textContent = "Sending…";
      setStatus(status, "Sending your inquiry securely…", "sending");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          let formspreeMessage = "";

          try {
            const result = await response.json();
            formspreeMessage = Array.isArray(result.errors)
              ? result.errors.map((error) => error.message).filter(Boolean).join(" ")
              : "";
          } catch {
            formspreeMessage = "";
          }

          throw new Error(formspreeMessage || `Form submission failed (${response.status}).`);
        }

        form.reset();
        setStatus(
          status,
          "Thank you. Your inquiry has been sent. We will reply within three business days.",
          "success",
        );
        status.focus({ preventScroll: true });
      } catch (error) {
        console.error("Inquiry form submission failed:", error);
        setStatus(
          status,
          `We could not send your inquiry. Please try again, or email us at ${SUPPORT_EMAIL}.`,
          "error",
        );
        status.focus({ preventScroll: true });
      } finally {
        button.disabled = false;
        button.removeAttribute("aria-busy");
        button.innerHTML = originalButtonContent;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseForm, { once: true });
  } else {
    initialiseForm();
  }
})();
