import { doc, getDoc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
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
    const updatePayload: Record<string, unknown> = {};
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

export const getCompletedCourseChapters = async (courseId: string): Promise<string[]> => {
  if (!auth.currentUser) return [];

  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const snapshot = await getDoc(userRef);
    const data = snapshot.data();
    const completedChapters = data?.courseProgress?.[courseId]?.completedChapters;

    return Array.isArray(completedChapters) ? completedChapters : [];
  } catch (error) {
    console.error('Failed to load course progress:', error);
    return [];
  }
};

export const markCourseChapterComplete = async (
  courseId: string,
  chapterId: string
): Promise<string[]> => {
  if (!auth.currentUser) return [];

  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const snapshot = await getDoc(userRef);
    const data = snapshot.data();
    const existing = data?.courseProgress?.[courseId]?.completedChapters;
    const completedChapters = Array.isArray(existing) ? existing : [];

    if (completedChapters.includes(chapterId)) {
      return completedChapters;
    }

    const nextCompletedChapters = [...completedChapters, chapterId];

    await setDoc(
      userRef,
      {
        lessonsCompleted: increment(1),
        courseProgress: {
          [courseId]: {
            completedChapters: nextCompletedChapters,
            updatedAt: serverTimestamp(),
          },
        },
      },
      { merge: true }
    );

    return nextCompletedChapters;
  } catch (error) {
    console.error('Failed to mark chapter complete:', error);
    return [];
  }
};
