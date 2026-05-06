// src/services/db.js
// All Firestore write helpers for the Zaivo app.
// Import individual functions wherever you need them.

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// ─── Collection names ────────────────────────────────────────────────────────
const COLLECTIONS = {
  CHATBOT_LEADS:       'chatbot_leads',
  CONTACT_SUBMISSIONS: 'contact_submissions',
  CHAT_CONVERSATIONS:  'chat_conversations',
};

// ─── Save chatbot demo-booking form ─────────────────────────────────────────
/**
 * Called when a user completes the guided chatbot flow and submits the demo form.
 * @param {Object} formData  – { name, company, phone, email, time }
 * @param {Object} answers   – { goal, industry, scale, pain }
 * @returns {string}         – The new Firestore document ID
 */
export async function saveChatbotLead(formData, answers = {}) {
  const docRef = await addDoc(collection(db, COLLECTIONS.CHATBOT_LEADS), {
    // Contact details
    name:    formData.name    || '',
    company: formData.company || '',
    phone:   formData.phone   || '',
    email:   formData.email   || '',
    preferredTime: formData.time || '',

    // Guided-flow answers
    goal:     answers.goal     || '',
    industry: answers.industry || '',
    scale:    answers.scale    || '',
    pain:     answers.pain     || '',

    // Meta
    source:    'chatbot_demo_form',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// ─── Save free-chat message ──────────────────────────────────────────────────
/**
 * Saves a single user free-chat message + bot reply pair.
 * Useful for auditing what users are asking.
 * @param {string} userMessage
 * @param {string} botReply
 */
export async function saveChatMessage(userMessage, botReply) {
  await addDoc(collection(db, COLLECTIONS.CHAT_CONVERSATIONS), {
    userMessage,
    botReply,
    source:    'free_chat',
    createdAt: serverTimestamp(),
  });
}

// ─── Save Contact-page submission ────────────────────────────────────────────
/**
 * Called when a user submits the Contact page form.
 * @param {Object} data – { email, organization, help, phone }
 * @returns {string}    – The new Firestore document ID
 */
export async function saveContactSubmission(data) {
  const docRef = await addDoc(collection(db, COLLECTIONS.CONTACT_SUBMISSIONS), {
    email:        data.email        || '',
    organization: data.organization || '',
    help:         data.help         || '',
    phone:        data.phone        || '',
    source:       'contact_page',
    createdAt:    serverTimestamp(),
  });
  return docRef.id;
}
