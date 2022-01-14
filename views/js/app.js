window.onerror = (e) => alert(e);
class Server {
  constructor() {}
  get(event, data) {
    socket.emit(`fetch_${event}`);
    return new Promise((resolve, reject) => {
      socket.on(`resolve_${event}`, (data) => {
        resolve(data);
      });
    });
  }
}
var _server = new Server();
const classTemplates = {
	inputs: {
		settings: "px-4 py-3 rounded-lg border border-transparent hover:bg-gray-200 bg-gray-100 focus:bg-white focus:border-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:bg-transparent dark:focus:border-gray-600 dark:text-white outline-none block mb-4 w-full"
	}
}
var socket = io();
window.addEventListener("hashchange", getHashPage);
function encodeHTML(str){
    return str.replace(/([\u00A0-\u9999<>&])(.|$)/g, function(full, char, next) {
      if(char !== '&' || next !== '#'){
        if(/[\u00A0-\u9999<>&]/.test(next))
          next = '&#' + next.charCodeAt(0) + ';';

        return '&#' + char.charCodeAt(0) + ';' + next;
      }

      return full;
    });
}


function getHashPage() {
  switch (window.location.hash.replace("#", "")) {
    case "/home":
      showHome();
      break;
    case "/search":
      _server.get("data").then((res) => {
        document.querySelector("#currentWebsite").innerHTML = "Find";
        document.getElementById("app").innerHTML = `
			<div class="p-10 mt-14">
				<input type="text" class="outline-none border rounded-lg dark:placeholder-white dark:bg-gray-600 dark:focus:bg-gray-900 dark:focus:border-gray-600 dark:text-white dark:focus:placeholder-gray-600 focus:border-gray-700 shadow-lg w-full py-4 bg-gray-200 focus:bg-white px-5 text-xl mb-4" placeholder="Find something..." id="_search">
				<div class="rounded-sm py-4" id="list">
				

				<a href="#/account" class="px-5 py-4 shadow-md border dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 hover:bg-sky-600 hover:text-white hover:bg-sky-600 dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 mb-2 hover:border-sky-600 matify:ripple focus:ring-2 focus:ring-sky-600 ring-offset-2 dark:ring-offset-0 margin-2 text-md rounded-lg outline-none text-gray-600 flex items-center dark:border-gray-700 dark:hover:border-sky-900"><i class="material-icons-round mr-5">article</i><div><span class="opacity-75">Config	</span><br><span>My account</span></div></a>

				<a href="#/home" class="px-5 py-4 shadow-md border dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 hover:bg-sky-600 hover:text-white hover:bg-sky-600 dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 mb-2 hover:border-sky-600 matify:ripple focus:ring-2 focus:ring-sky-600 ring-offset-2 dark:ring-offset-0 margin-2 text-md rounded-lg outline-none text-gray-600 flex items-center dark:border-gray-700 dark:hover:border-sky-900"><i class="material-icons-round mr-5">article</i><div><span class="opacity-75">Config	</span><br><span>Dashboard</span></div></a>


					${res.projects
            .map((e, id) => {
              return `<a href="javascript:void(0)" class="px-5 py-4 shadow-md border dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 hover:bg-sky-600 hover:text-white hover:bg-sky-600 dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 mb-2 hover:border-sky-600 matify:ripple focus:ring-2 focus:ring-sky-600 ring-offset-2 dark:ring-offset-0 margin-2 text-md rounded-lg outline-none text-gray-600 flex items-center dark:border-gray-700 dark:hover:border-sky-900" onclick="showSite(${id})"><i class="material-icons-round mr-5">science</i><div><span class="opacity-75">Projects</span><br><span>${e.name}</span></div></a>`;
            })
            .join("")}
				</div>
			</div>
			`;
        res.projects.forEach((e, id) => {
          e.visions.forEach((e) => {
            document.getElementById(
              "list"
            ).innerHTML += `<a href="javascript:void(0)" class="px-5 py-4 shadow-md border dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 hover:bg-sky-600 hover:text-white hover:bg-sky-600 dark:text-white dark:bg-gray-900 dark:hover:bg-sky-900 mb-2 hover:border-sky-600 matify:ripple focus:ring-2 focus:ring-sky-600 ring-offset-2 dark:ring-offset-0 margin-2 text-md rounded-lg outline-none text-gray-600 flex items-center dark:border-gray-700 dark:hover:border-sky-900" onclick="showSite(${id})"><i class="material-icons-round mr-5">check</i><div><span class="opacity-75">Visions	</span><br><span>${e[1]}</span></div></a>`;
          });
        });
        document.getElementById("_search").focus();
        document.getElementById("_search").addEventListener("keyup", () => {
          var input = document.getElementById("_search");
          document.querySelectorAll("#list a").forEach((listItem) => {
            if (
              listItem.innerText
                .toLowerCase()
                .includes(input.value.toLowerCase())
            ) {
              listItem.classList.remove("hidden");
            } else {
              listItem.classList.add("hidden");
            }
          });
        });
      });
      break;
    case "/account":
      _server.get("data").then((res) => {
        document.querySelector("#currentWebsite").innerHTML = "Account";
        document.getElementById("app").innerHTML = `
				<div class="p-10 mt-10">
					<h1 class="my-5 text-3xl text-theme">Settings</h1>
					<!-- Component Start -->
	<div class="grid grid-cols-2 gap-6 w-full max-w-6xl">
		
		<!-- Tile 1 -->
		<div class="flex items-center p-4 bg-white rounded">
			<div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
				<i class="material-icons">science</i>
			</div>
			<div class="flex-grow flex flex-col ml-4">
						<span class="text-xl font-bold">${res.projects.length}</span>
						<div class="flex items-center justify-between">
							<span class="text-gray-500">Projects</span>
							<span class="hidden text-green-500 text-sm font-semibold ml-2">+12.6%</span>
						</div>
					</div>
				</div>

				<!-- Tile 3 -->
				<div class="flex items-center p-4 bg-white rounded">
					<div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
						<i class="material-icons">account_circle</i>
						</svg>
					</div>
					<div class="flex-grow flex flex-col ml-4">
						<span class="text-xl font-bold">140</span>
						<div class="flex items-center justify-between">
							<span class="text-gray-500">Changes in the last few days</span>
							<span class="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
						</div>
					</div>
				</div>
				
			</div>
			<!-- Component End  -->
			<div class="px-2 py-5">
				<a class="matify:ripple matify:ripple@light btn btn-secondary">Request a feature</a>
				<a class="matify:ripple matify:ripple@light btn btn-danger">Delete account</a>
			</div>
				</div>
				`;
      });
      break;
    default:
      if (!window.location.hash.includes("/sites")) {
        showHome();
      }
  }
}
window.addEventListener("load", () => {
  _server.get("data").then((res) => {
    getHashPage();
    if (window.location.hash.includes("/sites")) {
      showSite(parseInt(window.location.hash.replace("#/sites/", "")));
    }
    res.projects.forEach((site, id) => {
      document.getElementById("_websiteDropdown").insertAdjacentHTML(
        "afterbegin",
        `
					<a href="javascript:void(0)" class="px-3 py-2 dark:text-white dark:hover:bg-gray-700 outline-none matify:ripple hover:bg-gray-200 rounded-none" onclick="showSite(${id})">
					${site.name}
					<span class="text-gray-500 dark:text-gray-300"><br>${site.url
            .replace("https://", "")
            .replace("http://", "")}</span>
					</a>
			`
      );
    });
  });
});

function showHome() {
  window.location.hash = "#/home";
  _server.get("data").then((res) => {
    document.querySelector("#currentWebsite").innerHTML = "Home";
    document.getElementById("app").innerHTML = `
		<div class="p-5 mt-5">
			<h5 class="text-gray-900 text-3xl my-5 dark:text-white"><b>Dashboard</b></h5>

			


<div x-data="drawer()">
	<button class="w-auto bg-theme text-white rounded-lg hover:bg-teal-700 matify:ripple transition-all px-4 py-3 focus:shadow-xl flex shadow-lg outline-none oultine-none" x-spread="trigger"><i class="material-icons mr-2">add</i>Create new project</button>
  <div class="dialog backdrop-blur-xl" x-spread="drawer" x-cloak>
    <div class="drawer-content dark:bg-gray-700 dark:text-white">
      <div class="dialog-header dark:border-gray-500 text-xl">Create new project
        <button type="button" class="btn btn-light btn-sm btn-icon dark:text-white dark:hover:bg-gray-600" aria-label="Close" @click="close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>
			<form id="createProjectForm">
      <div class="dialog-body">
					<input id="createProjectName" required class="${classTemplates.inputs.settings}" placeholder="Project name">
					<input type="url" id="createProjectBanner" required class="${classTemplates.inputs.settings}" placeholder="Project banner (Image URL)">
					<input type="url" id="createProjectUrl" required class="${classTemplates.inputs.settings}" placeholder="Project link">
					<textarea type="url" id="createProjectDescription" required class="${classTemplates.inputs.settings}" placeholder="Project description"></textarea>
			</div>
      <div class="dialog-footer dark:border-gray-500 dark:bg-transparent">
        <button type="submit" class="matify:ripple dark:text-white dark:hover:bg-gray-600 btn btn-light" @click="close">Create</button>
      </div>
			</form>
    </div>
  </div>
</div>

	<!-- Component Start -->
	<div class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
			${res.projects
        .map((site, id) => {
          return `
				<!-- Tile 1 -->
		<div class="flex flex-col bg-gray-100 matify:ripple rounded-lg p-4 my-2 hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer" onclick="showSite(${id})">
			<div class="h-40 bg-gray-400  rounded-lg overflow-hidden">
				<img src="${site.banner}" class="w-full h-full object-cover" draggable="false">
			</div>
			<div class="flex flex-col items-start mt-4">
				<h4 class="text-xl font-semibold">${site.name}</h4>
				<p class="mt-1"><a class="hover:underline flex items-center text-sm" href="${site.url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-4 mr-2 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
</svg>${site.url
          .replace("https://", "")
          .replace("http://", "")}</a></p>
				<p class="text-sm text-gray-500 truncate text-ellipsis overflow-hidden max-w-full mt-2">${site.description.substr(0,100)}</p>
				<!--<a class="p-2 leading-none rounded font-medium mt-3 bg-gray-400 text-xs uppercase" href="#">Click Here</a>-->
			</div>
		</div>
`;
        })
        .join("")}
		</div>
		</div>
		`;
		document.getElementById("createProjectForm").addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("addProject", {
        name: document.getElementById('createProjectName').value,
        banner: document.getElementById('createProjectBanner').value,
        url: document.getElementById('createProjectUrl').value,
        description: document.getElementById('createProjectDescription').value,
        visions: []
    })
})
  });
}

function showSite(id) {
  window.location.hash = `#/sites/${id}`;
  // Toastify({
  // 	text: "hi",
  // 	gravity: "bottom",
  // 	position: "left",
  // 	duration: 2000,
  // 	style: {
  // 		background: "auto",
  // 		width: "200px	",
  // 	},
  // 	className: "rounded-lg shadow-lg w-full px-4 py-3 text-sm bg-red-500"
  // }).showToast();
  _server.get("data").then((res) => {
    let _chartData = res.projects[id].visions;
		_chartData.forEach(d => {
			// d[4] = new Date(d[4][0], d[4][1], d[4][2])
			d[3] = new Date(d[3][0], d[3][1], d[3][2])
			d[4] = new Date(d[4][0], d[4][1], d[4][2])
		})
		// document.write(_chartData)
    document.querySelector("#currentWebsite").innerHTML = res.projects[id].name;

    document.getElementById("app").innerHTML = `
		<div class="flex items-center justify-center dark:bg-gray-900 bg-white" style="z-index:-1;transition-delay:1s"><img src="${
      res.projects[id].banner
    }" draggable="false" class="dark:bg-gray-800 bg-white w-full h-96 object-cover select-none transition-none" id="banner">
		<span class="absolute right-0 top-0 text-white p-2 inline-block">

		<div x-data="dialog()">
				<button class="hover:bg-gray-800 p-2 w-10 h-10 rounded-full matify:ripple matify:ripple@light outline-none focus:ring hover:ring-none backdrop-blur-lg shadow-lg" x-spread="trigger" id="settingsTrigger"><i class="material-icons-round">settings</i></button>
				<div class="flex backdrop-blur-xl dialog dialog-lg" x-spread="dialog" x-cloak>
					<div class="dialog-content p-5 dark:bg-gray-700">
						<div class="dialog-header text-2xl dark:border-gray-600">Settings
						<div>
							<button type="button" class="btn btn-light btn-sm dark:text-white matify:ripple dark:hover:bg-gray-500 btn-icon" aria-label="Close" @click="close" onclick="if(confirm('Delete project? This action is irreversible!')===true)socket.emit('deleteProject',${id})"><i class="material-icons">delete</i></button>
							<button type="button" class="btn btn-light btn-sm dark:text-white matify:ripple dark:hover:bg-gray-500 btn-icon" aria-label="Close" @click="close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>


							</div>
						</div>
						<form id="settingsForm">
							<div class="dialog-body mt-5">
									<input id="settingsFormName" class="${classTemplates.inputs.settings}" placeholder="Project name" value="${res.projects[id].name}">
									
									<input id="settingsFormUrl" type="url" class="${classTemplates.inputs.settings}" placeholder="Project url" value="${res.projects[id].url}">
									
									<input id="settingsFormBanner" type="url" class="${classTemplates.inputs.settings}" placeholder="Project banner (Image URL)" value="${res.projects[id].banner}">
									
									<textarea id="settingsFormDescription" class="${classTemplates.inputs.settings}" placeholder="Project description" style="padding-top: 5px;">${encodeHTML(res.projects[id].description)}</textarea>
							</div>
							<div class="dialog-footer dark:border-gray-600 bottom-0 rounded-full dark:bg-transparent">
								<button type="submit" class="btn btn-light dark:text-white hover:bg-gray-500 matify:ripple" @click="close">Save changes</button>
							</div>
						</form>
					</div>
				</div>
			</div>


		</span>
		</div>


		<div class="m-auto w-11/12 relative shadow-xl rounded-lg px-6 overflow-visible fadeUp py-5 bg-white dark:bg-gray-800 dark:text-white" style="top:-100px">
		
		
	<div x-data="dropdown()">
		<div class="text-right flex items-center">
			<h5 class="text-2xl my-3 text-bold text-left"><b>Visions</b></h5>
			<button class="outline-none focus:ring-2 active:ring-0 ring-inset w-10 h-10 hover:bg-gray-200 active:border-gray-600 text-gray-500 hover:text-gray-900 border border-transparent dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-all active:transition-none flex items-center justify-center matify:ripple order-2 ml-auto rounded-full" id="open-color-menu" onclick="setTimeout(function() {document.getElementById('input0').focus()}, 20)" x-spread="trigger"><i class="material-icons">add</i></button>
		</div>

		<div class="dropdown-list border border-gray-300 shadow-xl dark:bg-gray-700 dark:border-gray-600 w-96 absolute right-8 p-4 rounded-lg" id="color-menu" x-spread="dropdown" x-cloak style="margin-top: -200px;z-index:99999" x-position="top-start">
<form id="addVisionForm">
<p class="text-center my-2 mb-4 text-lg text-theme"><b>Create vision</b></p>
<div class="mb-3 pt-0">
  <input
    type="text"
		required
    placeholder="What's your vision?"
    class="dark:bg-gray-600 dark:focus:bg-transparent dark:focus:border-gray-600 dark:text-white px-3 py-3 placeholder-gray-3600 text-gray-600 relative bg-gray-200 hover:bg-gray-300 focus:bg-white rounded text-sm border focus:border-gray-400 border-transparent outline-none focus:outline-none w-full"
		id="input0"
  />
	<input
    type="text"
		required
    placeholder="Category"
    list="categories"
    class="dark:bg-gray-600 dark:focus:bg-transparent dark:focus:border-gray-600 dark:text-white px-3 py-3 mt-2 placeholder-gray-3600 text-gray-600 relative bg-gray-200 hover:bg-gray-300 focus:bg-white rounded text-sm border focus:border-gray-400 border-transparent outline-none focus:outline-none w-full"
		id="input1"
  />
</div>
<datalist id="categories">
    ${_chartData.map(option => {
			return `<option value="${option[2]}">${option[2]}</option>`
		}).join("")}
</datalist>

<div class="flex gap-3">
  <input
    type="date"
		id="_date1"
		required
    placeholder="Starting date"
    class="dark:bg-gray-600 dark:focus:bg-transparent dark:focus:border-gray-600 dark:text-white px-3 py-3 placeholder-gray-3600 grow text-gray-600 relative bg-gray-200 hover:bg-gray-300 focus:bg-white rounded text-sm border focus:border-gray-400 border-transparent outline-none focus:outline-none w-full"
    oninput="document.getElementById('_date2').min=this.value;document.getElementById('_date2').value=this.value"
  />
  <div class="grow-0 px-2 dark:bg-gray-600 rounded-lg bg-gray-200 py-3 w-20 text-center">To</div>
  <input
    id="_date2"
		required
    type="date"
    placeholder="Ending date"
    class="dark:bg-gray-600 dark:focus:bg-transparent dark:focus:border-gray-600 dark:text-white px-3 py-3 placeholder-gray-3600 grow text-gray-600 relative bg-gray-200 hover:bg-gray-300 focus:bg-white rounded text-sm border focus:border-gray-400 border-transparent outline-none focus:outline-none w-full"
  />
</div>
<button class="bg-theme text-white w-full py-2 rounded-md matify:ripple matify:ripple@light hover:bg-teal-600 shadow-md hover:shadow-lg outline-none mt-3">Create</button>
</form>


		</div>
		
	</div>



		<div class="overflow-x-scroll mt-5">
			${_chartData.length==0?`
				<div style="height:500px" class="w-full bg-gray-200 flex items-center justify-center dark:text-white dark:bg-gray-600 rounded-lg">
					No visions yet! Click on the "+" icon to create a new vision
				</div>			
			`:""}
			<div id="_chart" style="width:${_chartData.length>10?"150vw":"100%"}!important" class="${_chartData.length==0?'hidden':''}">
				<div style="height:500px" class="w-full bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></div>
			</div>
		</div>
		</div>
		<div class="${_chartData.length==0?'hidden':''} mt-5 m-auto relative shadow-xl rounded-lg dark:bg-gray-800 dark:text-white px-6 py-5 w-11/12 bg-white" style="top:-100px">
			<h5 class="text-2xl my-3 text-bold"><b>View all</b></h5>
			<input placeholder="Search..." class="outline-none border-b dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-500 rounded-t-lg dark:text-white px-3 py-2 mb-3 w-full focus:border-gray-500 focus:shadow-sm" type="text" onkeyup="document.querySelectorAll('#res .d').forEach(el => { if(el.innerText.toLowerCase().includes(this.value.toLowerCase()))  { el.classList.remove('hidden') } else { el.classList.add('hidden') } })">
<div id="res">
			${_chartData
        .map((e, key) => {
          return `  
<div x-data="dialog()" class="d">
  <button class="matify:ripple px-4 py-3 w-full border-l-2 border-theme hover:bg-green-50 dark:hover:bg-green-900 text-left outline-none focus:bg-green-100 dark:focus:bg-green-900 rounded-sm rounded-l-none mb-2" x-spread="trigger">
	<b>${e[1]}</b><br>
	<span>${`${
    e[3].getMonth() + 1
  }/${e[3].getDate()}/${e[3].getFullYear()}`} to ${`${
            e[4].getMonth() + 1
          }/${e[4].getDate()}/${e[4].getFullYear()}`}</span>
	</button>
  <div class="dialog backdrop-blur-xl items-center flex" x-spread="dialog" x-cloak>
    <div class="dialog-content h-auto sm:h-auto rounded-lg shadow-xl dark:bg-gray-700">
      <div class="dark:border-gray-600 dialog-header flex-col my-3 text-2xl">
				<input 
				value="${encodeHTML(e[1])}" 
				@blur="close"
				onkeyup="if(event.keyCode===13)this.blur()"
				onblur="if(this.value!=='') {socket.emit('updateVision',${id}, ${key}, 1, this.value)}"
				class="outline-none bg-gray-100 hover:bg-gray-100 border border-transparent focus:border-gray-100 focus:bg-white text-black focus:text-gray-900 px-2 py-1 rounded-md dark:bg-gray-600 dark:border-gray-600 bg-gray-100 dark:text-white">
			</div>
      <div class="dialog-body">
			<div class="lg:grid-cols-3 md:grid-cols-3 gap-3">
			<input 
				value="${`${e[3].getFullYear()}-${`${e[3].getMonth()+1}`.padStart(2, "0")}-${`${e[3].getDate()+1}`.padStart(2, "0")}`}"
				@blur="close"
				onkeyup="if(event.keyCode===13)this.blur()"
				onblur="if(this.value!=='') {socket.emit('updateVision',${id}, ${key}, 3, this.value.split('-'))}"
				type="date"
				class="outline-none bg-gray-100 hover:bg-gray-100 border border-transparent focus:border-gray-100 focus:bg-white text-black focus:text-gray-900 px-2 py-1 rounded-md dark:bg-gray-600 dark:border-gray-600 bg-gray-100 dark:text-white">
				<span class="mx-4">to</span>
				<input 
				value="${`${e[4].getFullYear()}-${`${e[4].getMonth()+1}`.padStart(2, "0")}-${`${e[4].getDate()+1}`.padStart(2, "0")}`}"
				@blur="close"
				onkeyup="if(event.keyCode===13)this.blur()"
				onblur="if(this.value!=='') {socket.emit('updateVision',${id}, ${key}, 4, this.value.split('-'))}"
				type="date"
				class="outline-none bg-gray-100 hover:bg-gray-100 border border-transparent focus:border-gray-100 focus:bg-white text-black focus:text-gray-900 px-2 py-1 rounded-md dark:bg-gray-600 dark:border-gray-600 bg-gray-100 dark:text-white">
				</div>


				<div class="flex items-center gap-4">
				<input @blur="close" value="${e[6]}" type="number" max="100" min="0" onkeyup="if(event.keyCode===13)this.blur()" onblur="if(this.value!=='') {socket.emit('updateVision',${id}, ${key}, 6, parseInt(this.value))}" class="outline-none bg-gray-100 dark:focus:border-gray-600 dark:bg-gray-600 dark:text-white hover:bg-gray-100 border border-transparent focus:border-gray-100 focus:bg-white mt-2 text-black focus:text-gray-900 px-2 py-1 align-middle rounded-md">
				<span class="py-2 mt-2 align-middle">%</span>
				</div>

				<div class="flex w-auto matify:chip dark:bg-gray-500 dark:text-white">${e[2]}</div>

				<div class="border-t dark:border-gray-600 grid grid-cols-2 gap-2 pt-2">
					<a 
					@click="close"
					target="_blank" class="outline-none focus:shadow-md matify:ripple py-4 px-2 text-center rounded-xl"
					href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates${encodeURIComponent(
            e[3].toISOString()
          )}&details=Imported%20from%20Visionly&text=${encodeURIComponent(
            e[1]
          )}">
					<i class="matify:icon">event</i><br>
					Add to calendar</a>

					<a 
					@click="close"
					href="javascript:void(0)"
					class="outline-none focus:shadow-md matify:ripple py-4 px-2 text-center rounded-xl" onclick="deleteVision(${id}, ${key})">
					<i class="matify:icon">delete</i><br>
					Delete</a>
				</div>
			</div>
      <div class="dark:border-gray-600 dialog-footer hidden sm:visible">
        <button type="button" class="btn btn-light" @click="close">Close</button>
      </div>
    </div>
  </div>
</div>
`;
        })
        .join("")}
		</div>
		</div>
		`;
		socket.on("addVision", (d) => {
			if(window.location.hash == "#/sites/"+id) {
				showSite(id)
			}
		})
		
		document.getElementById("settingsForm").addEventListener("submit", (e) => {
			e.preventDefault();
			socket.emit("updateSettings", id, {
				name: document.getElementById('settingsFormName').value,
				url: document.getElementById('settingsFormUrl').value,
				banner: document.getElementById('settingsFormBanner').value,
				description: document.getElementById('settingsFormDescription').value,
			});
		})
		document.getElementById("addVisionForm").addEventListener("submit", e => {
			e.preventDefault();
			var data = [
				"test",
				document.getElementById("input0").value,
				document.getElementById("input1").value,
				document.getElementById("_date1").value.split("-").map(function (x) { return parseInt(x, 10); }),
				document.getElementById("_date2").value.split("-").map(function (x) { return parseInt(x, 10); }),
				null,
				0,
				null
			];
			socket.emit("addVision", id, data)
		})
    google.charts.load("current", { packages: ["gantt"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Task ID");
      data.addColumn("string", "Task Name");
      data.addColumn("string", "Resource");
      data.addColumn("date", "Start Date");
      data.addColumn("date", "End Date");
      data.addColumn("number", "Duration");
      data.addColumn("number", "Percent Complete");
      data.addColumn("string", "Dependencies");

      data.addRows(_chartData);
      var options = {
				is3D: true,
        height: data.getNumberOfRows() * 60,
        criticalPathEnabled: false,
				backgroundColor: {
					fill: (document.documentElement.classList.contains("dark") ? "#1f2937":"#fff")
				},
        gantt: {
					labelStyle: {
					color: (document.documentElement.classList.contains("dark") ? "#fff":"#757575")
					},
          barCornerRadius: 5,
          barHeight: 35,
          palette: [
            {
              color: "#5e97f6",
              dark: "#2a56c6",
              light: "#c6dafc",
            },
            {
              color: "#db4437",
              dark: "#a52714",
              light: "#f4c7c3",
            },
            {
              color: "#f2a600",
              dark: "#ee8100",
              light: "#fce8b2",
            },
            {
              color: "#0f9d58",
              dark: "#0b8043",
              light: "#b7e1cd",
            },
            {
              color: "#ab47bc",
              dark: "#6a1b9a",
              light: "#e1bee7",
            },
            {
              color: "#00acc1",
              dark: "#00838f",
              light: "#b2ebf2",
            },
            {
              color: "#ff7043",
              dark: "#e64a19",
              light: "#ffccbc",
            },
            {
              color: "#9e9d24",
              dark: "#827717",
              light: "#f0f4c3",
            },
            {
              color: "#5c6bc0",
              dark: "#3949ab",
              light: "#c5cae9",
            },
            {
              color: "#f06292",
              dark: "#e91e63",
              light: "#f8bbd0",
            },
            {
              color: "#00796b",
              dark: "#004d40",
              light: "#b2dfdb",
            },
            {
              color: "#c2185b",
              dark: "#880e4f",
              light: "#f48fb1",
            },
          ],
        },
      };

      var chart = new google.visualization.Gantt(
        document.getElementById("_chart")
      );

      chart.draw(data, options);
      google.visualization.events.addListener(chart, "select", viewChartItem);
      function viewChartItem() {
        if (chart.getSelection()[0]) {
          var row = chart.getSelection()[0].row;
          console.log(data.getValue(row, 1));
        }
      }
    }
    window.prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
			if(window.location.hash.includes("/sites")){
				if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
					document.getElementById("banner").style.filter=`blur(${document.body.scrollTop/2 || document.documentElement.scrollTop/2}px)`
				}
				else {
					document.getElementById("banner").style.filter=""
				}
			}
      if (window.innerWidth < 992) {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById("currentWebsite").parentElement.style.top =
            "";
          // document.getElementById("currentWebsite").parentElement.style.transition = ""
        } else {
          document.getElementById(
            "currentWebsite"
          ).parentElement.style.top = `${-document.body.scrollTop || -document.documentElement.scrollTop}px`;
          // document.getElementById("currentWebsite").parentElement.style.transition = "none"
        }
        prevScrollpos = currentScrollPos;
      }
    };
  });
}

function deleteVision(pr, id) {
	socket.emit("deleteVision", pr, id)
}
socket.on('deleteVision', (pr) => {
	showSite(pr);
	document.body.style.overflow=""
})
if(localStorage.getItem('dark') === 'true') {
	document.querySelector(`meta[name="theme-color"]`).setAttribute("content", "#1f2937")
	document.documentElement.classList.add('dark')
}
socket.on("updateSettings", () => {
	getHashPage();
})
socket.on("addProject", getHashPage)

socket.on("deleteProject",()=>window.location.hash="#/home")

socket.on("retry", () => window.location.reload())

window.addEventListener("keyup", (e) => {
	if(document.activeElement) {
		if(e.altKey && e.code === "Slash") {
			e.preventDefault();
			document.getElementById("settingsTrigger").click()
		}
		if(e.ctrlKey && e.code == "KeyD") {
			e.preventDefault();
			window.location.hash = "#/home"
		}
		else if(e.code === "Slash") {
			e.preventDefault();
			window.location.hash = "#/search"
		}
	}
})