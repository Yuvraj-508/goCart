import prisma from "@/lib/prisma";
import { inngest } from "./client";

export const syncUserCreation = inngest.createFunction(
  { id: "Sync-User-Create" },
  { event: "clerk/user.created" },
  async ({ event}) => {
      const {data} = event;
      await prisma.user.create({
        data: {
          id: data.id,
          email: data.email_addresses[0]?.email_address || "",
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
      // Add your logic to sync the user to your database here
  }
        });
    }
);

export const syncUserUpdation = inngest.createFunction(
    { id: "Sync-User-Update" },
    { event: "clerk/user.updated" },    
    async ({ event}) => {
        const {data} = event;
        await prisma.user.update({
          where: {
            id: data.id,
          },
          data: {
            email: data.email_addresses[0]?.email_address || "",
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
        // Add your logic to sync the user to your database here
    }
          });
      }
  );

  export const syncUserDeletion = inngest.createFunction(
    { id: "Sync-User-Delete" },
    { event: "clerk/user.deleted" },    
    async ({ event}) => {
        const {data} = event;
        await prisma.user.delete({
          where: {
            id: data.id,
          },
      // Add your logic to sync the user to your database here
          });
      }
  );