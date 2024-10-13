import { useStore } from "@/contexts/use-store";
import { useUser } from "@account-kit/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { EMAIL_CONTAINER_ID, ERROR_COMPONENT_ID, STORAGE_KEY } from "../config";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { EmailContainer } from "./email-container";
import { emailSubmission } from "@/actions/email-submission";
import { act } from "react";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

vi.mock("@/contexts/use-store", () => ({
  useStore: vi.fn(),
}));

vi.mock("@/actions/email-submission", () => ({
  emailSubmission: vi.fn(),
}));

const mockUser = { address: "0x123" };
const mockStore = {
  get: vi.fn(),
  set: vi.fn(),
};

describe("EmailContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="${EMAIL_CONTAINER_ID}">
        <input type="email" />
        <a>Submit</a>
      </div>
      <div id="${ERROR_COMPONENT_ID}"></div>
    `;
  });

  (useUser as Mock).mockReturnValue(mockUser);
  (useStore as Mock).mockReturnValue(mockStore);

  it("should show the container if no email is stored", () => {
    mockStore.get.mockReturnValue(null);

    render(<EmailContainer />);

    const container = document.getElementById(EMAIL_CONTAINER_ID);
    expect(container?.style.display).toBe("block");
  });

  it("should hide the container if an email is already stored", () => {
    mockStore.get.mockReturnValue("test@test.test");

    render(<EmailContainer />);

    const container = document.getElementById(EMAIL_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });

  it("should prevent form submission on 'Enter' key press", () => {
    render(<EmailContainer />);

    const input = document.querySelector(
      `#${EMAIL_CONTAINER_ID} input`
    ) as HTMLInputElement;
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(input.value).toBe("");
  });

  it("should update the email state on input", () => {
    const mockEmail = "test@test.test";

    render(<EmailContainer />);

    const input = document.querySelector(
      `#${EMAIL_CONTAINER_ID} input`
    ) as HTMLInputElement;
    fireEvent.input(input, { target: { value: mockEmail } });

    expect(input.value).toBe(mockEmail);
  });

  it("should call email submission on submit button click", async () => {
    (emailSubmission as Mock).mockResolvedValue(true);

    render(<EmailContainer />);

    const input = document.querySelector(`#${EMAIL_CONTAINER_ID} input`);
    fireEvent.input(input!, { target: { value: "test@test.test" } });

    const submitButton = document.querySelector(`#${EMAIL_CONTAINER_ID} a`);
    await act(async () => {
      fireEvent.click(submitButton!);
    });

    expect(emailSubmission).toHaveBeenCalledWith({
      email: "test@test.test",
      url: window.location.href,
    });
    expect(mockStore.set).toHaveBeenCalledWith(STORAGE_KEY, {
      email: "test@test.test",
    });
  });

  it("should display an error message on failed email submission", async () => {
    (emailSubmission as Mock).mockResolvedValue(false);

    render(<EmailContainer />);

    const input = document.querySelector(`#${EMAIL_CONTAINER_ID} input`);
    fireEvent.input(input!, { target: { value: "invalid@test.test" } });

    const submitButton = document.querySelector(`#${EMAIL_CONTAINER_ID} a`);
    await act(async () => {
      fireEvent.click(submitButton!);
    });

    await waitFor(() => {
      const errorLabel = document.getElementById(ERROR_COMPONENT_ID);
      expect(errorLabel?.innerText).toBe(
        "Oops! You must provide a valid email"
      );
    });
  });

  it("should show the error message in the error container", async () => {
    (emailSubmission as Mock).mockResolvedValue(false);

    render(<EmailContainer />);

    const input = document.querySelector(`#${EMAIL_CONTAINER_ID} input`);
    fireEvent.input(input!, { target: { value: "invalid@test.test" } });

    const submitButton = document.querySelector(`#${EMAIL_CONTAINER_ID} a`);
    await act(async () => {
      fireEvent.click(submitButton!);
    });

    await waitFor(() => {
      const errorLabel = document.getElementById(ERROR_COMPONENT_ID);
      expect(errorLabel?.innerText).toBe(
        "Oops! You must provide a valid email"
      );
    });
  });
});
