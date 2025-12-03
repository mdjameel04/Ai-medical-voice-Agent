import { createContext } from "react";
import { UsersDetail } from "../provider";

export const UsersDetailContext = createContext<UsersDetail |any>( undefined)