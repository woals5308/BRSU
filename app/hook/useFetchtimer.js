import { useEffect } from "react";
import { useRouter } from "expo-router";

const useFetchTimer = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/page/Agree");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; 
};

export default useFetchTimer;
