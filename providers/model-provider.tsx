"use client";

import {useEffect, useState} from "react";

import {RenameModel} from "@/components/model/rename-model";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return <RenameModel />;
};
