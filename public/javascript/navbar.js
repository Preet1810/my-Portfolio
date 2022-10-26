

$(window).scroll(function () {
    const scroll=$(window).scrollTop();

    if (scroll>=800) {
        $(".navbar").addClass("fixed-top");
    } else {
        $(".navbar").removeClass("fixed-top");
    }
});


const SKILLS_LIST=[
    {
        label: 'HTML5/CSS3 - 95%',
        percentage: '95%',
    },
    {
        label: 'ES6 / 95%',
        percentage: '95%',
    },
    {
        label: 'React/Redux - 95%',
        percentage: '95%',
    },
    {
        label: 'Angular - 50%',
        percentage: '50%',
    },
    {
        label: 'Wordpress - 80%',
        percentage: '80%',
    },
    {
        label: 'Webpack/Gulp - 90%',
        percentage: '90%',
    },
    {
        label: 'Cypress/Mocha/Enzyme - 95%',
        percentage: '95%',
    },
];
console.log(SKILLS_LIST)
const ProgressLine=({ label, percentage, barBg, progresBg, barHeight }) => {
    const [widths, setWidths]=React.useState(0);

    React.useEffect(() => {
        requestAnimationFrame(() => setWidths(percentage));
    }, [percentage]);

    return (
        <section className="progress-line">
            <span className="progress-line__label">{label}</span>
            <div
                className="progress-line__outer"
                style={{
                    background: barBg,
                    height: `${barHeight}px`,
                }}>
                <div
                    className="progress-line__inner"
                    style={{
                        width: widths,
                        background: progresBg,
                        transition: 'width 2s',
                    }} />
            </div>
        </section>
    );
};

const Skills=() => (
    <section className="container" >
        <div className="row">
            <div className="col-12 pt-5">
                <h1>React Loading bars</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-12 py-5">
                {
                    SKILLS_LIST.map((skill, index) => ( // index: static values
                        <ProgressLine
                            key={index}
                            barHeight="15"
                            barBg="#efefef"
                            progresBg="rgba(255, 82, 82, .7)"
                            label={skill.label}
                            percentage={skill.percentage} />
                    ))
                }
            </div>
        </div>
    </section>
);

ReactDOM.render(<Skills />, document.getElementById('app'));
