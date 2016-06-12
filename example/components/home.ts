let homeTemplate = `
    <h1>home state loaded</h1>
    <div ui-view></div>
    `;

export class HomeController {
  $onInit() {
    console.log("Hellow from home component!")
  }
}

const Home  = {
  template: homeTemplate,
  controller: HomeController
}

export default Home;