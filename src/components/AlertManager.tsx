import { useEffect } from 'react';
import { collection, onSnapshot, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthProvider';

export const AlertManager = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'alerts'),
      where('userId', '==', user.uid),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const alert = change.doc.data();
          alertUser(alert.message);
        }
      });
    });

    return unsubscribe;
  }, [user]);

  const alertUser = (message: string) => {
    // Basic browser alert as a placeholder for real notification
    console.log('ALERT:', message);
    // In a real app, integrate with Web Push, Twilio, SendGrid
  };

  return null; // Component for logic, not visible
};
