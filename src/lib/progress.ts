import { doc, setDoc, increment } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export const updateUserProgress = async (updates: {
  certificatesEarned?: number;
  lessonsCompleted?: number;
  hoursLearned?: number;
  coursesEnrolled?: number;
}) => {
  // If no one is logged in, do nothing
  if (!auth.currentUser) return;

  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);

    // Prepare the update payload using Firebase's 'increment' feature
    const updatePayload: any = {};
    if (updates.certificatesEarned)
      updatePayload.certificatesEarned = increment(updates.certificatesEarned);
    if (updates.lessonsCompleted)
      updatePayload.lessonsCompleted = increment(updates.lessonsCompleted);
    if (updates.hoursLearned) updatePayload.hoursLearned = increment(updates.hoursLearned);
    if (updates.coursesEnrolled) updatePayload.coursesEnrolled = increment(updates.coursesEnrolled);

    // Merge the new progress with their existing data
    await setDoc(userRef, updatePayload, { merge: true });
  } catch (error) {
    console.error('Failed to update user progress:', error);
  }
};
