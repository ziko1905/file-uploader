-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mainFolderId_fkey" FOREIGN KEY ("mainFolderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
