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
