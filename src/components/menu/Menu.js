import { Component } from "react";
import { Link } from "react-router-dom";

import "./Menu.scss";

class Menu extends Component {
	constructor(props) {
		super(props);
		const savedTheme = localStorage.getItem("theme");
		this.state = {
			isDark: savedTheme === "dark",
			isOpenLanguage: false,
		};
		// Привязываем метод к контексту компонента
		this.toggleTheme = this.toggleTheme.bind(this);
	}

	componentDidMount() {
		// Если тема тёмная, добавляем класс dark на body
		if (this.state.isDark) {
			document.body.classList.add("dark");
		}
	}

	toggleTheme() {
		this.setState(
			(prevState) => ({ isDark: !prevState.isDark }),
			() => {
				// Меняем класс на body в зависимости от состояния
				document.body.classList.toggle("dark");

				// Сохраняем тему в localStorage
				if (this.state.isDark) {
					localStorage.setItem("theme", "dark");
				} else {
					localStorage.setItem("theme", "light");
				}
			}
		);
	}

	handleCheckboxChange = () => {
		const newMenuOpen = !this.props.menuOpen;
		this.props.updateStateBool("menuOpen", newMenuOpen);
	};

	toggleOpenLanguage = () => {
		this.setState((prevState) => ({
			isOpenLanguage: !this.state.isOpenLanguage,
		}));
	};

	render() {
		return (
			<div className='menu'>
				<nav role='navigation'>
					<div id='menuToggle'>
						<input
							type='checkbox'
							id='menuCheckbox'
							onClick={this.handleCheckboxChange}
							className={this.props.menuOpen ? "active" : ""}
						/>
						<span></span>
						<span></span>
						<span></span>

						<ul id='menu'>
							<li>
								<Link to='/'>
									<svg
										viewBox='0 0 24 24'
										width='16'
										height='16'>
										<path d='M19,2h-1V1c0-.552-.448-1-1-1s-1,.448-1,1v1H8V1c0-.552-.448-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h4c.552,0,1-.448,1-1s-.448-1-1-1H5c-1.654,0-3-1.346-3-3V10H23c.552,0,1-.448,1-1v-2c0-2.757-2.243-5-5-5Zm3,6H2v-1c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v1Zm-3.121,4.879l-5.707,5.707c-.755,.755-1.172,1.76-1.172,2.829v1.586c0,.552,.448,1,1,1h1.586c1.069,0,2.073-.417,2.828-1.172l5.707-5.707c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121c-1.134-1.134-3.11-1.134-4.243,0Zm2.828,2.828l-5.708,5.707c-.377,.378-.879,.586-1.414,.586h-.586v-.586c0-.534,.208-1.036,.586-1.414l5.708-5.707c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Zm-16.707-1.707c0-.552,.448-1,1-1h7c.552,0,1,.448,1,1s-.448,1-1,1H6c-.552,0-1-.448-1-1Zm6,4c0,.552-.448,1-1,1H6c-.552,0-1-.448-1-1s.448-1,1-1h4c.552,0,1,.448,1,1Z' />
									</svg>
									<label htmlFor='menuCheckbox'>Tasks</label>
								</Link>
							</li>
							<li>
								<Link to='/completed'>
									<svg
										viewBox='0 0 24 24'
										width='16'
										height='16'>
										<path d='m4 6a2.982 2.982 0 0 1 -2.122-.879l-1.544-1.374a1 1 0 0 1 1.332-1.494l1.585 1.414a1 1 0 0 0 1.456.04l3.604-3.431a1 1 0 0 1 1.378 1.448l-3.589 3.414a2.964 2.964 0 0 1 -2.1.862zm20-2a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.589-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1.023 1.023 0 0 1 -1.414 0l-1.59-1.585a1 1 0 0 0 -1.414 1.414l1.585 1.585a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.585-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1 1 0 0 1 -1.456-.04l-1.585-1.414a1 1 0 0 0 -1.332 1.494l1.544 1.374a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1z' />
									</svg>
									<label htmlFor='menuCheckbox'>Completed</label>
								</Link>
							</li>
							<li>
								<Link to='/filter'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										id='Outline'
										viewBox='0 0 24 24'
										width='16'
										height='16'>
										<path d='M1,4.75H3.736a3.728,3.728,0,0,0,7.195,0H23a1,1,0,0,0,0-2H10.931a3.728,3.728,0,0,0-7.195,0H1a1,1,0,0,0,0,2ZM7.333,2a1.75,1.75,0,1,1-1.75,1.75A1.752,1.752,0,0,1,7.333,2Z' />
										<path d='M23,11H20.264a3.727,3.727,0,0,0-7.194,0H1a1,1,0,0,0,0,2H13.07a3.727,3.727,0,0,0,7.194,0H23a1,1,0,0,0,0-2Zm-6.333,2.75A1.75,1.75,0,1,1,18.417,12,1.752,1.752,0,0,1,16.667,13.75Z' />
										<path d='M23,19.25H10.931a3.728,3.728,0,0,0-7.195,0H1a1,1,0,0,0,0,2H3.736a3.728,3.728,0,0,0,7.195,0H23a1,1,0,0,0,0-2ZM7.333,22a1.75,1.75,0,1,1,1.75-1.75A1.753,1.753,0,0,1,7.333,22Z' />
									</svg>

									<label htmlFor='menuCheckbox'>Filter</label>
								</Link>
							</li>
							<li>
								<Link to='/labels'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										id='Outline'
										viewBox='0 0 24 24'
										width='16'
										height='16'>
										<path d='M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z' />
										<path d='M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z' />
										<path d='M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z' />
										<path d='M14,7h3v3a1,1,0,0,0,2,0V7h3a1,1,0,0,0,0-2H19V2a1,1,0,0,0-2,0V5H14a1,1,0,0,0,0,2Z' />
									</svg>

									<label htmlFor='menuCheckbox'>Labels</label>
								</Link>
							</li>
							<li>
								<div
									className={`languages ${
										this.state.isOpenLanguage ? "active" : ""
									}`}>
									<Link onClick={this.toggleOpenLanguage}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											id='Layer_1'
											data-name='Layer 1'
											viewBox='0 0 24 24'>
											<path d='M24,7v2c0,.552-.448,1-1,1s-1-.448-1-1v-2c0-1.103-.897-2-2-2h-2.029l1.25,1.307c.383,.398,.371,1.031-.028,1.414-.194,.187-.443,.279-.693,.279-.262,0-.524-.103-.721-.307l-2.212-2.301c-.761-.761-.761-2.023,.013-2.798L17.779,.307c.383-.398,1.017-.41,1.414-.028,.398,.383,.411,1.016,.028,1.414l-1.257,1.307h2.036c2.206,0,4,1.794,4,4ZM6.221,16.307c-.383-.398-1.016-.409-1.414-.027-.398,.383-.411,1.016-.028,1.414l1.25,1.307h-2.029c-1.103,0-2-.897-2-2v-2c0-.553-.448-1-1-1s-1,.447-1,1v2c0,2.206,1.794,4,4,4h2.035l-1.256,1.307c-.383,.398-.371,1.031,.028,1.414,.194,.187,.443,.279,.693,.279,.262,0,.524-.103,.721-.307l2.199-2.288c.773-.774,.773-2.036,.013-2.798l-2.212-2.301Zm5.779-8.307c0,2.209-1.791,4-4,4H4c-2.209,0-4-1.791-4-4V4C0,1.791,1.791,0,4,0h4c2.209,0,4,1.791,4,4v4Zm-2.5-4.384c0-.34-.276-.616-.616-.616h-2.257v-.384c0-.34-.276-.616-.616-.616h-.021c-.34,0-.616,.276-.616,.616v.384H3.116c-.34,0-.616,.276-.616,.616v.021c0,.34,.276,.616,.616,.616H7.308c-.111,.963-.484,2.151-1.303,3.071-.276-.31-.507-.648-.692-1-.106-.202-.318-.325-.545-.325-.464,0-.769,.492-.553,.903,.225,.43,.501,.843,.83,1.22-.539,.328-1.189,.559-1.977,.635-.32,.031-.568,.293-.568,.614v.021c0,.365,.316,.648,.679,.614,1.146-.107,2.079-.485,2.832-1.022,.749,.533,1.671,.913,2.808,1.022,.364,.035,.68-.248,.68-.613v-.021c0-.316-.24-.583-.555-.613-.792-.075-1.442-.31-1.984-.639,.99-1.135,1.485-2.591,1.607-3.866h.316c.34,0,.616-.276,.616-.616v-.021Zm14.5,12.384v4c0,2.209-1.791,4-4,4h-4c-2.209,0-4-1.791-4-4v-4c0-2.209,1.791-4,4-4h4c2.209,0,4,1.791,4,4Zm-3.196,5.144l-1.363-5.948c-.107-.464-.403-.886-.842-1.07-.919-.385-1.855,.155-2.056,1.021l-1.413,5.993c-.104,.439,.23,.86,.681,.86h0c.324,0,.606-.223,.681-.539l.274-1.161h2.409l.265,1.157c.073,.318,.356,.543,.682,.543h.002c.449,0,.782-.418,.682-.856Zm-2.818-5.744c-.038,0-.071,.026-.079,.063l-.811,3.437h1.757l-.787-3.437c-.009-.037-.041-.063-.079-.063Z' />
										</svg>

										<label htmlFor='menuCheckbox'>Language</label>
									</Link>
									<div className='languages__items'>
										<div
											className='languages__item languages__item_en'
											onClick={() =>
												this.props.updateStateBool("language", "en")
											}>
											<svg
												viewBox='0 0 24 24'
												height='20'
												width='20'>
												<path d='M19,4h-.101c-.465-2.279-2.484-4-4.899-4H5C2.243,0,0,2.243,0,5v12.855c-.054,1.663,1.984,2.755,3.339,1.787l2.967-1.978c.69,1.937,2.523,3.336,4.694,3.336h5.697l3.963,2.642c1.356,.967,3.393-.124,3.34-1.787V9c0-2.757-2.243-5-5-5ZM2.229,17.978c-.05,.079-.268-.039-.229-.123V5c0-1.654,1.346-3,3-3H14c1.654,0,3,1.346,3,3v7c0,1.654-1.346,3-3,3H7c-.198-.001-.383,.078-.555,.168l-4.216,2.81Zm19.771,3.877c.039,.086-.183,.203-.23,.123l-4.215-2.81c-.164-.109-.357-.168-.555-.168h-6c-1.302,0-2.402-.839-2.816-2h5.816c2.757,0,5-2.243,5-5V6c1.654,0,3,1.346,3,3v12.855ZM7.7,12h-1.7c-.552,0-1-.448-1-1V6c0-.552,.448-1,1-1h1.7c.442,0,.8,.358,.8,.8s-.358,.8-.8,.8h-1.101v1.101h1.101c.442,0,.8,.358,.8,.8s-.358,.8-.8,.8h-1.101v1.101h1.101c.442,0,.8,.358,.8,.8s-.358,.8-.8,.8Zm1.8-.747V5.914c0-.505,.409-.914,.914-.914,.354,0,.675,.204,.827,.524l1.433,3.031v-2.808c0-.412,.334-.747,.747-.747s.747,.334,.747,.747v5.339c0,.505-.409,.914-.914,.914h0c-.353,0-.675-.204-.826-.523l-1.432-3.025v2.801c0,.412-.334,.747-.747,.747s-.747-.334-.747-.747Z' />
											</svg>
											<span>English</span>
										</div>
										<div
											className='languages__item languages__item_ru'
											onClick={() =>
												this.props.updateStateBool("language", "ru")
											}>
											<svg
												width='20'
												height='20'
												viewBox='0 0 24 24'>
												<path d='M19,4h-.101c-.465-2.279-2.484-4-4.899-4H5C2.243,0,0,2.243,0,5v12.854c-.053,1.663,1.984,2.753,3.339,1.788l2.967-1.978c.69,1.937,2.523,3.336,4.694,3.336h5.697l3.964,2.643c1.355,.968,3.392-.126,3.339-1.788V9c0-2.757-2.243-5-5-5ZM2.23,17.979c-.051,.079-.269-.04-.23-.124V5c0-1.654,1.346-3,3-3H14c1.654,0,3,1.346,3,3v7c0,1.654-1.346,3-3,3H7c-.198-.001-.383,.078-.555,.168l-4.215,2.811Zm19.77,3.876c.04,.084-.182,.203-.23,.124l-4.215-2.811c-.164-.109-.357-.168-.555-.168h-6c-1.302,0-2.402-.839-2.816-2h5.816c2.757,0,5-2.243,5-5V6c1.654,0,3,1.346,3,3v12.854ZM10,9.622v-3.822c0-.442,.358-.8,.8-.8h0c.442,0,.8,.358,.8,.8v3.95c0,.358,.292,.65,.65,.65s.65-.292,.65-.65v-3.95c0-.442,.358-.8,.8-.8h0c.442,0,.8,.358,.8,.8v3.95c0,1.319-1.135,2.373-2.482,2.238-1.171-.117-2.018-1.19-2.018-2.367Zm-2.77,1.852c.115,.316,.416,.527,.752,.527,.555,0,.942-.552,.752-1.074l-.674-1.853c.636-.458,1.028-1.235,.923-2.1-.137-1.136-1.135-1.973-2.279-1.973h-1.228c-.618,0-.976,.358-.976,.8v5.4c0,.442,.358,.8,.8,.8s.8-.358,.8-.8v-1.7h.413l.718,1.973Zm-1.13-4.873h.65c.358,0,.65,.292,.65,.65s-.292,.65-.65,.65h-.65v-1.3Z' />
											</svg>

											<span>Russian</span>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div
									className='mode__container'
									onClick={this.toggleTheme}>
									<div className='mode'></div>
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Menu;
