var path = require("path"); 
const { browser, element, ProtractorExpectedConditions, Browser, ExpectedConditions } = require("protractor");
const { BrowserStack } = require("protractor/built/driverProviders");
describe("long asynchronous specs", function() {
   beforeEach(function() {
       originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
       jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;
      });  
      // checking for title of webpage 
      it('should have a title', function() {
         browser.get('http://localhost:4200/upload');
         expect(browser.getTitle()).toEqual('Docutest');
       });
      //test: json file upload
      it("successfully uploads a json file", function() {    
         //selecting browser
         browser.get("http://localhost:4200/upload");
         //file location for multi.json  
         var fileToUpload = "../Protractor/multi.json"; 
         // functionality for file upload
         var absolutePath = path.resolve(process.cwd(), fileToUpload);
         element(by.css('input[type="file"]')).sendKeys(absolutePath);
         browser.sleep(3000); 
         // test on file upload
         expect(element(by.binding('this.selectedFile'))==(fileToUpload));
         expect(element(by.binding('this.fileExt'))==('.json')); 
      });
      //test: yaml file upload
      it("successfully uploads a yaml file", function() {    
         //selecting browser
         browser.get("http://localhost:4200/upload");
         //file location for multi.json  
         var fileToUpload = "../Protractor/validSwagger.yaml"; 
         // functionality for file upload
         var absolutePath = path.resolve(process.cwd(), fileToUpload);
         element(by.css('input[type="file"]')).sendKeys(absolutePath);
         browser.sleep(3000); 
         // test on file upload
         expect(element(by.binding('this.selectedFile'))==(fileToUpload));
         expect(element(by.binding('this.fileExt'))==('.yaml')); 
      });
   //test: clicking buttons 
   it("Two button clicks and upload", function() {
      element(by.buttonText("Start Test")).click();
      browser.sleep(3000);
      expect(element(by.className("modal-header")).isPresent()).toBe(true); 
      });  
   //uploading an improper file 
   it("Improper file upload", function() {
         browser.refresh();
         //file location for multi.json  
         var badFileToUpload = "../Protractor/parseError.json"; 
         // functionality for file upload
         var absolutePathTwo = path.resolve(process.cwd(), badFileToUpload);
         element(by.css('input[type="file"]')).sendKeys(absolutePathTwo);
         browser.sleep(1000); 
         var show = element(by.binding('this.show')); 
         expect(show==true); 
   }); 
      //uploading an proper file 
      it("Proper file upload", function() {
         browser.get("http://localhost:4200/upload");
         //file location for multi.json  
         var FileToUpload = "../Protractor/multi.json"; 
         // functionality for file upload
         var absolutePath = path.resolve(process.cwd(), FileToUpload);
         element(by.css('input[type="file"]')).sendKeys(absolutePath);
         var show = element(by.binding('this.show')); 
         expect(show==false);       
   });
}); 

 
//test for file upload with advanced options
it("successfully uploads a json file with advanced options using loops", function() {
   //selecting browser
  browser.get("http://localhost:4200/upload");
    //uploading file 
    var fileToUpload = "../protractor/multi.json"; 
    var absolutePath = path.resolve(process.cwd(), fileToUpload);
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    browser.sleep(500); 
    //clicking buttons 
    element(by.buttonText("Start Test")).click();
    browser.sleep(500);
    // hardcoded variables
    const loops = 5; 
    const planName = "ProtractorTest";
    const thread = 5; 
    const rampUp = 5; 
    //doesn't time out 
   //  browser.waitForAngular(false); 
    // enters value for Advance Options
    element(by.id("Loops or Duration","Number of Loops")).click();
    element(by.id("loops")).sendKeys(loops);
    element(by.id("planName")).sendKeys(planName)
    element(by.id("thread")).sendKeys(thread);
    element(by.id("rampUp")).sendKeys(rampUp);
    // Click buttons
    element(by.id("Start Test")).click(); 
    browser.sleep(500);
    browser.wait(ExpectedConditions.urlContains("results-summary"),25000);
    console.log("Element Found");
    expect(element(by.tagName('app-demo-table')).isPresent()).toBe(true);
    
});

it("successfully runs test on json a file", function() {
   //selecting browser
  browser.get("http://localhost:4200/upload");
    //uploading file 
    var fileToUpload = "../protractor/multi.json"; 
    var absolutePath = path.resolve(process.cwd(), fileToUpload);
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    browser.sleep(500); 
    //clicking buttons 
    element(by.buttonText("Start Test")).click();
    browser.sleep(500);
    element(by.id("Start Test")).click(); 
    browser.sleep(500);
    browser.wait(ExpectedConditions.urlContains("results-summary"),25000);
    console.log("Element Found");
    expect(element(by.tagName('app-demo-table')).isPresent()).toBe(true);
    
});

it("successfully runs test on yaml a file", function() {
   //selecting browser
  browser.get("http://localhost:4200/upload");
    //uploading file 
    var fileToUpload = "../protractor/validSwagger.yaml"; 
    var absolutePath = path.resolve(process.cwd(), fileToUpload);
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    browser.sleep(500); 
    //clicking buttons 
    element(by.buttonText("Start Test")).click();
    browser.sleep(500);
    element(by.id("Start Test")).click(); 
    browser.sleep(500);
    browser.wait(ExpectedConditions.urlContains("results-summary"),25000);
    console.log("Element Found");
    expect(element(by.tagName('app-demo-table')).isPresent()).toBe(true);
});

//test for file upload with advanced options
it("successfully uploads a yaml file with advanced options using duration", function() {
   //selecting browser
  browser.get("http://localhost:4200/upload");
    //uploading file 
    var fileToUpload = "../protractor/validSwagger.yaml"; 
    var absolutePath = path.resolve(process.cwd(), fileToUpload);
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    browser.sleep(500); 
    //clicking buttons 
    element(by.buttonText("Start Test")).click();
    browser.sleep(500); 
    // hardcoded variables
    const planName = "ProtractorTest"; 
    const duration = 5; 
    const thread = 5; 
    const rampUp = 5; 
    //doesn't time out 
   //  browser.waitForAngular(false); 
    // enters value for Advance Options
    element(by.id("Loops or Duration","Duration")).click();
    element(by.id("planName")).sendKeys(planName);
    element(by.id("duration")).sendKeys(duration);
    element(by.id("thread")).sendKeys(thread);
    element(by.id("rampUp")).sendKeys(rampUp);
    // Click buttons
    element(by.id("Start Test")).click(); 
    browser.sleep(500);
    browser.wait(ExpectedConditions.urlContains("results-summary"),25000);
    console.log("Element Found");
   //  browser.waitForAngular(false);
    expect(element(by.tagName('app-demo-table')).isPresent()).toBe(true);
    
});