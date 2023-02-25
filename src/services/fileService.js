const path = require("path");

const uploadSingleFile = async (fileObject) => {
   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   let uploadPath = path.resolve(__dirname, "../public/images/uploads");

   //get image extension
   let extName = path.extname(fileObject.name);
   //get image's name (without extension)
   let baseName = path.basename(fileObject.name, extName);
   //create final path: eg: /uploads/your-image.png
   let finalName = `${baseName}-${Date.now()}${extName}`;
   let finalPath = `${uploadPath}/${finalName}`;

   // Use the mv() method to place the file somewhere on your server
   try {
      await fileObject.mv(finalPath);
      return {
         status: "success",
         path: finalName,
         fileName: fileObject.name,
         error: null,
      };
   } catch (error) {
      return {
         status: "failed",
         path: null,
         error: JSON.stringify(err),
      };
   }
};

const uploadMultipleFiles = async (filesArr) => {
   try {
      let uploadPath = path.resolve(__dirname, "../public/images/uploads");
      let resultArr = [];
      let countSucess = 0;
      for (let i = 0; i < filesArr.length; i++) {
         //get image extension
         let extName = path.extname(filesArr[i].name);
         //get image's name (without extension)
         let baseName = path.basename(filesArr[i].name, extName);
         //create final path: eg: /uploads/your-image.png
         let finalName = `${baseName}-${Date.now()}${extName}`;
         let finalPath = `${uploadPath}/${finalName}`;

         try {
            await filesArr[i].mv(finalPath);
            resultArr.push({
               status: "success",
               path: finalName,
               fileName: filesArr[i].name,
               error: null,
            });
            countSucess++;
         } catch (error) {
            resultArr.push({
               status: "failed",
               path: null,
               fileName: filesArr[i].name,
               error: JSON.stringify(err),
            });
         }
      }

      return {
         countSucess: countSucess,
         detail: resultArr,
      };
   } catch (error) {
      return {
         status: "failed",
         path: null,
         error: JSON.stringify(err),
      };
   }
};

module.exports = {
   uploadSingleFile,
   uploadMultipleFiles,
};
