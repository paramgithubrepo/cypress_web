class PracticePageImageUpload{
    getTitle(){
        return cy.get('.image-upload-wrapper h3');
    }
getFileInput(){
    return cy.get('input[type="file"]');
}
getUploadedImage(){
    return cy.get('.image-upload-wrapper img');
}
selectFile(filePath){
    this.getFileInput().selectFile(filePath) 
}

}
export default PracticePageImageUpload