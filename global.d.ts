import { TypedPocketBase } from "typed-pocketbase";
import { Schema } from "src/lib/pb/db-types";
import { postgresInstance } from "@/lib/pg/pg";
import { DbAuthProps } from "@/lib/pg/pg";
import { PocketBaseClient } from "@/lib/pb/client";

declare module "rakkasjs" {
    interface PageLocals {
        /** My application-specific stuff */
        pb: PocketBaseClient;

    }
    interface ServerSideLocals {
      /** My application-specific stuff */
      pb: PocketBaseClient;

    }
}




declare interface ReturnedError {
    error: {
        message: string;
        original_error: string,

    }
}
