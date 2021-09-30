import React, { useState } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../lib/errorLib";
import config from "../config";

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  //Billing, if necessary

  return (
    <div className="Settings">
    </div>
  );
}
