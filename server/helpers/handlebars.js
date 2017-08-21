import handlebars from 'handlebars';

export default class HandlebarsHelpers {
    static registerHandlebarsHelpers() {
        handlebars.registerHelper('math', function(lvalue, operator, rvalue, options) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            return {
                '+': lvalue + rvalue,
                '-': lvalue - rvalue,
                '*': lvalue * rvalue,
                '/': lvalue / rvalue,
                '%': lvalue % rvalue
            }[operator];
        });
    }
}
