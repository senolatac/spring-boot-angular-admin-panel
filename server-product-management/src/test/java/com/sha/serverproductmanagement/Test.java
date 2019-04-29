package com.sha.serverproductmanagement;

public class Test {

    public  static void contextLoads() {

        //null arr =null

        int[] arr = {1,2,3,4,5};
        int[] arr1 = new int[arr.length];
        //xor choise: is effective way
        //arr[i]^=arr[length-i];
        int len = arr.length;
        for(int i=0; i<arr.length; i++){
            //simple way and not effective
            arr1[len - i -1]= arr[i];
        }
        System.out.println("Simple way Space complexity = O(n)");
        for(int i: arr1){
            System.out.println(i);
        }
    }

    //xor choise
    public void effectiveWay(){
        int[] arr = {1,2,3,4,5};
        for(int i=0; i<arr.length; i++){
            arr[i]^=arr[arr.length-i];
        }

        System.out.println("Effective way Space complexity = O(1)");
        for(int i: arr){
            System.out.println(i);

        }
    }

    public static void main(String[] args) {
        contextLoads();
    }
}
