export default async function handle(...args) {
  try {
    return { result: await this(...args) };
  } catch (e) {
    return { error: e };
  }
}
