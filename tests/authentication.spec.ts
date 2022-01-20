import test from "@playwright/test";
import { request } from "playwright-core";

test.beforeAll(async ({ }) => {

    const requestContext = await request.newContext({
        httpCredentials: {
            username: 'user',
            password: 'passwd'
        }
    });
    
    await requestContext.get(`https://api.example.com/login`);
    
    await requestContext.storageState({ path: 'state.json'});
    
    const context = await browser.newContext({ storageState: 'state.json'});

} )
