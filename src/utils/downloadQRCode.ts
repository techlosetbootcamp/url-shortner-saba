export const downloadQRCode = (url: string) => {
  const svg = document.getElementById(`qr-${url}`);
  if (svg) {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const qrImage = new window.Image();
    qrImage.src = `data:image/svg+xml;base64,${btoa(svgData)}`;

    const desiredSize = 256;

    qrImage.onload = () => {
      canvas.width = desiredSize;
      canvas.height = desiredSize;
      ctx?.drawImage(qrImage, 0, 0, desiredSize, desiredSize);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = `${url}-qrcode.png`;
      downloadLink.click();
    };
  }
};
