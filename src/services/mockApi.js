export const mockAIResponse = (mode, payload = {}) => {
  const { text = "", regex = "", index = 0 } = payload;

  switch (mode) {
    case "WRITE":
      return {
        mode,
        text:
          text ||
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      };
    case "APPEND":
      return {
        mode,
        text:
          text ||
          " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      };
    case "ANNOTATE":
    case "CUSTOM_ANNOTATE":
      return { mode, regex, index };
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
};
