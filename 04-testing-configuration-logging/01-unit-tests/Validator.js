module.exports = class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(obj) {
    const errors = [];

    for (const field of Object.keys(this.rules)) {
      const rules = this.rules[field];

      const value = obj[field];
      const type = typeof value;

      // проверка на типы перенесена в блок свич,
      // чтобы при ошибке не блокировать проверку следующих полей объекта
      function checkType() {
        if (type !== rules.type) {
          errors.push({field, error: `expect ${rules.type}, got ${type}`});
          return true;
        }
        return false;
      }

      switch (type) {
        case 'string':
          if (checkType()) {
            break;
          }
          if (value.length < rules.min) {
            errors.push({field, error: `too short, expect ${rules.min}, got ${value.length}`});
          }
          if (value.length > rules.max) {
            errors.push({field, error: `too long, expect ${rules.max}, got ${value.length}`});
          }
          break;
        case 'number':
          if (checkType()) {
            break;
          }
          if (value < rules.min) {
            errors.push({field, error: `too little, expect ${rules.min}, got ${value}`});
          }
          if (value > rules.max) {
            errors.push({field, error: `too big, expect ${rules.min}, got ${value}`});
          }
          break;
      }
    }

    return errors;
  }
};
