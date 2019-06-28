import React from 'react';
import Black from '../assets/Mana_B.png';
import Blue from '../assets/Mana_U.png';
import Red from '../assets/Mana_R.png';
import White from '../assets/Mana_W.png';
import Green from '../assets/Mana_G.png';
import BlackU from '../assets/Mana_B_unchecked.png';
import BlueU from '../assets/Mana_U_unchecked.png';
import RedU from '../assets/Mana_R_unchecked.png';
import WhiteU from '../assets/Mana_W_unchecked.png';
import GreenU from '../assets/Mana_G_unchecked.png';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icons: [],
			iconSize: 40,
			iconPadding: 5,
			width: 250,
			height: 250,
			selectedIcon: null,
			player: { name: 'Player 1', color: null },
			step: 1
		};
		this.state.icons.push({ name: 'W', state: false, srcOn: White, srcOff: WhiteU });
		this.state.icons.push({ name: 'U', state: false, srcOn: Blue, srcOff: BlueU });
		this.state.icons.push({ name: 'B', state: false, srcOn: Black, srcOff: BlackU });
		this.state.icons.push({ name: 'R', state: false, srcOn: Red, srcOff: RedU });
		this.state.icons.push({ name: 'G', state: false, srcOn: Green, srcOff: GreenU });
	}

	nextStep = () => {
		this.props.onContinue(this.state.player);
		if (this.state.step === this.props.players) {
			this.props.close();
		} else {
			let selectedIconIndex = this.state.icons.findIndex((el) => el.name === this.state.selectedIcon);
			let icons = [ ...this.state.icons ];
			let step = this.state.step + 1;
			let player = { name: `Player ${step}`, color: null };
			icons[selectedIconIndex].disabled = true;
			this.setState({ step, icons, player });
		}
	};

	handleNameChange = (e) => {
		let player = { ...this.state.player };
		player.name = e.target.value;
		this.setState({ player });
	};

	handleChange = (index) => {
		let icons = [ ...this.state.icons ];
		let player = { ...this.state.player };
		let newIcon = { ...icons[index] };
		if (!newIcon.disabled) {
			newIcon.state = !newIcon.state;
			icons.forEach((icon) => (icon.state = false));
			icons[index] = newIcon;
			let selectedIcon = !!newIcon.state ? newIcon.name : null;
			player.color = !!newIcon.state ? newIcon.srcOn : null;
			this.setState({ icons, selectedIcon, player });
		}
	};

	renderFlavorText = () => {
		switch (this.state.selectedIcon) {
			case 'W':
				return (
					<p>
						White wants peace. White looks around and sees a world of suffering. There are so many
						individuals that struggle day to day, but the world has the resources to address this suffering.
						There is enough for everyone to have what they need (as opposed to what they want). Suffering is
						a by-product of individuals not prioritizing the good of the group.
					</p>
				);
			case 'U':
				return (
					<p>
						Blue wants perfection. Blue believes that each and every one of us is born a blank slate with
						the potential to become anything. The entire point of life is figuring out what you could
						achieve with the right education, experience, and tools. Note that this is not a task with an
						end goal, but one that continues throughout your life. There will always be things you can do to
						improve, change, or adapt. The journey of life is one of constant discovery as you keep seeking
						to better yourself.
					</p>
				);
			case 'B':
				return (
					<p>
						Black wants power. Black looks at all the other colors and feels that each of them sees the
						world as they wish it to be. Black is the only realist, the only color to look and see the world
						as it is. An individual is free to have whatever they want, provided they have the power to
						obtain and keep it. This makes power the most important resource, because it's the one thing
						that can guarantee your ability to control your life and thus your happiness.
					</p>
				);
			case 'R':
				return (
					<p>
						Red wants freedom. Everyone seems preoccupied with the meaning of life. Red's not, because red
						already knows the answer. You see, your heart tells you what it needs to be fulfilled. All you
						have to do is listen to it and act accordingly. It's not a mystery. You are literally bombarded
						with constant feelings that guide you down the correct path. The problem is all the other colors
						ignore the message.
					</p>
				);
			case 'G':
				return (
					<p>
						Green wants acceptance. The other colors are all focused on how they'd change the world to make
						it better. Green is the one color that doesn't want to change the world because green is
						convinced that the world already got everything right. The natural order is a thing of beauty
						and has all the answers to life's problems. The key is learning to sit back and recognize what
						is right in front of you.
					</p>
				);
			default:
				return <p />;
		}
	};

	render() {
		// let classes = this.props.closed ? 'modal off' : 'modal';
		return (
			<div className="modal" id="modal">
				<h2>
					Choose your color,{' '}
					<input type="text" value={this.state.player.name} onChange={(e) => this.handleNameChange(e)} />
				</h2>
				<div className="content">
					<div style={{ height: this.state.height, width: this.state.width, position: 'relative' }}>
						{this.state.icons.map((icon, index) => {
							const a0 = -Math.PI / 2;
							const a = a0 + index * 2 * Math.PI / this.state.icons.length;
							const r = this.state.width / 2 - this.state.iconSize - this.state.iconPadding * 2;
							const dx = r * Math.cos(a);
							const dy = r * Math.sin(a);
							const x = this.state.width / 2 + dx - this.state.iconSize / 2 - this.state.iconPadding;
							const y = this.state.height / 2 + dy - this.state.iconSize / 2 - this.state.iconPadding;

							return (
								<div
									key={index}
									style={{
										position: 'absolute',
										top: y + 'px',
										left: x + 'px',
										padding: this.state.iconPadding + 'px'
									}}
									onClick={() => this.handleChange(index)}
								>
									{icon.disabled ? (
										<img src={icon.srcOff} alt="disabled" height={this.state.iconSize} />
									) : icon.state ? (
										<img
											style={{ transform: 'scale(1.35)' }}
											src={icon.srcOn}
											alt="selected"
											height={this.state.iconSize}
										/>
									) : (
										<img src={icon.srcOn} alt="unselected" height={this.state.iconSize} />
									)}
								</div>
							);
						})}
					</div>
					<div style={{ marginLeft: '250px' }}>{this.renderFlavorText()}</div>
				</div>
				<div className="actions">
					<button
						disabled={this.state.player.name === '' || this.state.player.color === null}
						onClick={this.nextStep}
						className="toggle-button"
					>
						continue
					</button>
				</div>
			</div>
		);
	}
}
