/**
 * Profile Service - Firebase Realtime Database Integration
 * 
 * Saves and retrieves user profile data from Firebase Realtime Database.
 * Uses the user's email (sanitized) as the unique key for each profile.
 */

import { database } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';

export interface UserProfile {
    displayName: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
    interests: string;
    updatedAt: string;
}

/**
 * Sanitize email to use as a Firebase Realtime Database key.
 * Firebase keys cannot contain: . $ # [ ] /
 */
function sanitizeEmailForKey(email: string): string {
    return email
        .replace(/\./g, '_dot_')
        .replace(/@/g, '_at_')
        .replace(/\$/g, '_dollar_')
        .replace(/#/g, '_hash_')
        .replace(/\[/g, '_lb_')
        .replace(/\]/g, '_rb_')
        .replace(/\//g, '_slash_');
}

/**
 * Save user profile data to Firebase Realtime Database.
 * Path: /users/{sanitizedEmail}/profile
 */
export async function saveProfile(email: string, profileData: Omit<UserProfile, 'email' | 'updatedAt'>): Promise<void> {
    const key = sanitizeEmailForKey(email);
    const profileRef = ref(database, `users/${key}/profile`);

    const dataToSave: UserProfile = {
        ...profileData,
        email,
        updatedAt: new Date().toISOString(),
    };

    await set(profileRef, dataToSave);
}

/**
 * Get user profile data from Firebase Realtime Database.
 * Returns null if no profile exists yet.
 */
export async function getProfile(email: string): Promise<UserProfile | null> {
    const key = sanitizeEmailForKey(email);
    const profileRef = ref(database, `users/${key}/profile`);

    const snapshot = await get(profileRef);

    if (snapshot.exists()) {
        return snapshot.val() as UserProfile;
    }

    return null;
}
