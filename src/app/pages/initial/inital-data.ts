import { Purchase } from '../../interfaces/initial';

export class InitialData {
  formatData(data: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let datasets: any = [
      {
        label: '1',
        data: [],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        tension: 0.4,
      },
      {
        label: '2',
        data: [],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--pink-500'),
        tension: 0.4,
      },
    ];
    // console.log('====')
    // console.log(data)
    // console.log('====')
    data.purchaseData.purchaseMonth.forEach((element: any) => {
      datasets[0].data.push(element.amount);
    });

    data.purchaseData.purchasePreviouMonth.forEach((element: any) => {
      datasets[1].data.push(element.amount);
    });

    let graph: any = [
      {
        lastPurchase: data.purchaseData.purchaseMonth[0],
        totalAmountMonth: data.totalAmountMonth,
        totalAmountPreviousMonth: data.totalAmountPreviousMonth,
      },
      {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets,
      },
    ];

    return { graph };
  }
}
