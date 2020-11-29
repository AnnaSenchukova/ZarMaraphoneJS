class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selectors, attacks = []}) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;

        this.renderHP();
    }

    changeHP = (count, callback) => {

        if(this.hp.current < count) {
            this.hp.current = 0;

        } else {
            this.hp.current -= count;
        }

        this.renderHP();

        callback && callback(count, this);
    };


    renderHPLife = () => {
        this.elHP.innerText = this.buildRenderHPText();
    };

    renderProgressbarHP = () => {
        this.elProgressbar.style.width = this.hp.current + '%';
    };

    buildRenderHPText = () => {
        return this.hp.current + ' / ' + this.hp.total;
    };

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    };
}

export default Pokemon;