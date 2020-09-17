const replaceAll = (text, search, replacement) => {
   //for (var x in obj) {
   text = text.replace(new RegExp(search, "g"), replacement);

   return text;
};

const formatValue = (format, value) => {
   const type = typeof format === "string" ? format : format.type;
   const decimals = typeof format === "string" ? 2 : format.decimals;

   const transform = function (org, n, x, s, c) {
      const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
         num = org.toFixed(Math.max(0, ~~n));

      return (c ? num.replace(".", c) : num).replace(
         new RegExp(re, "g"),
         "$&" + (s || ",")
      );
   };
   switch (type) {
      case "currency":
         return !isNaN(value)
            ? `$${transform(parseFloat(value), decimals, 3, ",", ".")}`
            : value;
      case "number":
         return !isNaN(value)
            ? `${transform(parseFloat(value), decimals, 3, ",", ".")}`
            : value;
      case "percentage":
         return !isNaN(value)
            ? `${transform(parseFloat(value), decimals, 3, ",", ".")}%`
            : value;
      default:
         return value;
   }
};

const value = "$2.003";
let rawValue = replaceAll(value, ",", "");
rawValue = replaceAll(rawValue, "\\$", "");

const formatedValue = formatValue("currency", rawValue);
console.log("-----------------");
console.log(`value: ${value}`);
console.log(`rawValue: ${rawValue}`);
console.log(`formatedValue: ${formatedValue}`);
