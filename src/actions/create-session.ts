import { createAsyncThunk } from "@reduxjs/toolkit";
import { ensureSuccessfulHttpStatus, makeTmdbPath } from "../utils.js";

type CreateSessionResponse = {
	success: boolean;
	session_id: string;
};

export const createSession = createAsyncThunk(
	"createSession",
	async (requestToken: string) => {
		const response = await fetch(makeTmdbPath("/authentication/session/new"), {
			method: "POST",
			body: JSON.stringify({
				request_token: requestToken,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		ensureSuccessfulHttpStatus(response.status);
		const {
			success,
			session_id,
		} = (await response.json()) as CreateSessionResponse;
		if (!success) {
			throw new Error("Failed to authenticate");
		}
		return session_id;
	}
);
