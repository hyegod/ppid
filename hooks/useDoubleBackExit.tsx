// hooks/useDoubleBackExit.ts
import { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { usePathname } from 'expo-router';

const useDoubleBackExit = (): [boolean, () => void] => {
  const [backPressedOnce, setBackPressedOnce] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const isTargetRoute = pathname === '/loginReg/login' || pathname === '/home';

    if (isTargetRoute) {
      const backAction = (): boolean => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }

        setBackPressedOnce(true);
        setShowToast(true);

        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }
  }, [backPressedOnce, pathname]);

  const hideToast = () => setShowToast(false);

  return [showToast, hideToast];
};

export default useDoubleBackExit;