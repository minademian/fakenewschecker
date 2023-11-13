/**
 * Source: https://github.com/fbsamples/original-coast-clothing/blob/main/services/graph-api.js
 */

import config from './config';
import fetch from 'node-fetch';
import { URL, URLSearchParams } from 'url';

class GraphApi {
  static async callSendApi(requestBody: unknown) {
    const params = new URLSearchParams({
      access_token: config.pageAccessToken as string,
    });
    let url: any = new URL(`${config.apiUrl}/me/messages`);
    url.search = params;

    console.warn('Request body is\n' + JSON.stringify(requestBody));
    console.warn('Request body is\n' + JSON.stringify(requestBody));

    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      console.warn(
        `Unable to call Send API: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async callMessengerProfileAPI(requestBody: any) {
    // Send the HTTP request to the Messenger Profile API

    console.log(`Setting Messenger Profile for app ${config.appId}`);
    let url: any = new URL(`${config.apiUrl}/me/messenger_profile`);
    url.search = new URLSearchParams({
      access_token: config.pageAccessToken as string,
    });
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      console.log(`Request sent.`);
    } else {
      console.warn(
        `Unable to callMessengerProfileAPI: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async callSubscriptionsAPI(customFields: string = '') {
    // Send the HTTP request to the Subscriptions Edge to configure your webhook
    // You can use the Graph API's /{app-id}/subscriptions edge to configure and
    // manage your app's Webhooks product
    // https://developers.facebook.com/docs/graph-api/webhooks/subscriptions-edge
    console.log(
      `Setting app ${config.appId} callback url to ${config.webhookUrl}`
    );

    let fields =
      'messages, messaging_postbacks, messaging_optins, ' +
      'message_deliveries, messaging_referrals';

    if (customFields !== undefined) {
      fields = fields + ', ' + customFields;
    }

    console.log({ fields });

    const params = new URLSearchParams({
      access_token: `${config.appId}|${config.appSecret}` as string,
      object: 'page',
      callback_url: config.webhookUrl as string,
      verify_token: config.verifyToken as string,
      fields: fields,
      include_values: 'true',
    });
    let url: any = new URL(`${config.apiUrl}/${config.appId}/subscriptions`);
    url.search = params;

    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log(`Request sent.`);
    } else {
      console.error(
        `Unable to callSubscriptionsAPI: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async callSubscribedApps(customFields: string = '') {
    // Send the HTTP request to subscribe an app for Webhooks for Pages
    // You can use the Graph API's /{page-id}/subscribed_apps edge to configure
    // and manage your pages subscriptions
    // https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps
    console.log(`Subscribing app ${config.appId} to page ${config.pageId}`);

    let fields =
      'messages, messaging_postbacks, messaging_optins, ' +
      'message_deliveries, messaging_referrals';

    if (customFields !== undefined) {
      fields = fields + ', ' + customFields;
    }

    console.log({ fields });

    let url: any = new URL(`${config.apiUrl}/${config.pageId}/subscribed_apps`);
    url.search = new URLSearchParams({
      access_token: config.pageAccessToken as string,
      subscribed_fields: fields,
    });
    let response = await fetch(url, {
      method: 'POST',
    });
    if (response.ok) {
      console.log(`Request sent.`);
    } else {
      console.error(
        `Unable to callSubscribedApps: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async getUserProfile(senderIgsid: string) {
    let url: any = new URL(`${config.apiUrl}/${senderIgsid}`);
    url.search = new URLSearchParams({
      access_token: config.pageAccessToken as string,
      fields: 'first_name, last_name, gender, locale, timezone',
    });
    let response = await fetch(url);
    if (response.ok) {
      let userProfile: any = await response.json();
      return {
        firstName: userProfile.first_name,
        lastName: userProfile.last_name,
        gender: userProfile.gender,
        locale: userProfile.locale,
        timezone: userProfile.timezone,
      };
    } else {
      console.warn(
        `Could not load profile for ${senderIgsid}: ${response.statusText}`,
        await response.json()
      );
      return null;
    }
  }

  static async getPersonaAPI() {
    // Send the POST request to the Personas API
    console.log(`Fetching personas for app ${config.appId}`);

    let url: any = new URL(`${config.apiUrl}/me/personas`);
    url.search = new URLSearchParams({
      access_token: config.pageAccessToken as string,
    });
    let response = await fetch(url);
    if (response.ok) {
      let body: any = await response.json();
      return body.data;
    } else {
      console.warn(
        `Unable to fetch personas for ${config.appId}: ${response.statusText}`,
        await response.json()
      );
      return null;
    }
  }

  static async postPersonaAPI(name: string, profile_picture_url: string) {
    let requestBody = {
      name,
      profile_picture_url,
    };
    console.log(`Creating a Persona for app ${config.appId}`);
    console.log({ requestBody });
    let url: any = new URL(`${config.apiUrl}/me/personas`);
    url.search = new URLSearchParams({
      access_token: config.pageAccessToken as string,
    });
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      console.log(`Request sent.`);
      let json: any = await response.json();
      return json.id;
    } else {
      console.error(
        `Unable to postPersonaAPI: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async callNLPConfigsAPI() {
    // Send the HTTP request to the Built-in NLP Configs API
    // https://developers.facebook.com/docs/graph-api/reference/page/nlp_configs/

    console.log(`Enable Built-in NLP for Page ${config.pageId}`);

    const params = new URLSearchParams({
      access_token: config.pageAccessToken as string,
      nlp_enabled: 'true',
    });
    let url: any = new URL(`${config.apiUrl}/me/nlp_configs`);
    url.search = params;
    let response = await fetch(url, {
      method: 'POST',
    });
    if (response.ok) {
      console.log(`Request sent.`);
    } else {
      console.error(`Unable to activate built-in NLP: ${response.statusText}`);
    }
  }

  static async reportLeadSubmittedEvent(psid: string) {
    let url: any = new URL(`${config.apiUrl}/${config.appId}/page_activities`);
    url.search = new URLSearchParams({
      access_token: config.pageAccessToken as string,
    });
    let requestBody = {
      custom_events: [
        {
          _eventName: 'lead_submitted',
        },
      ],
      advertiser_tracking_enabled: 1,
      application_tracking_enabled: 1,
      page_id: config.pageId,
      page_scoped_user_id: psid,
      logging_source: 'messenger_bot',
      logging_target: 'page',
    };
    console.warn(
      'Request to ' + url + '\nWith body:\n' + JSON.stringify(requestBody)
    );
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        console.warn(
          `Unable to call App Event API: ${response.statusText}`,
          await response.json()
        );
      }
    } catch (error) {
      console.error('Error while reporting lead submitted', error);
    }
  }
}

export default GraphApi;
